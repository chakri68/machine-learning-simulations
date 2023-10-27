import { OptionalObjectOf, mergeOptionals } from "@/lib/ts-utils";
import algebra, { Equation, Expression } from "algebra.js";
import { create, all } from "mathjs";
import {
  Transformation,
  TransformationManager2D,
} from "./TransformationManager";

const math = create(all, {});

export type CanvasOptions = {
  transformation?: Transformation;
  pixelOptions?: { pixelSize: number; pixelColor: string };
  lineOptions?: {
    lineColor: string;
    lineWidth: number;
  };
};

export class GradientDescentCanvas {
  private options: Required<CanvasOptions>;
  private transformationManager: TransformationManager2D;

  constructor(
    public canvas: HTMLCanvasElement,
    public ctx: CanvasRenderingContext2D,
    options: CanvasOptions = {}
  ) {
    this.configureCanvas();
    const defaultOptions: OptionalObjectOf<CanvasOptions> = {
      transformation: {
        translate: [this.canvas.width / 2, this.canvas.height / 2],
        rotation: 0,
        scale: [1, -1],
      },
      pixelOptions: {
        pixelSize: 5,
        pixelColor: "rgba(0, 175, 0, 0.5)",
      },
      lineOptions: {
        lineColor: "rgba(255, 0, 0, 0.5)",
        lineWidth: 1,
      },
    };
    this.options = mergeOptionals(options, defaultOptions);
    this.transformationManager = new TransformationManager2D(
      this.options.transformation
    );

    // Draw the axes
    this.drawAxes();
  }

  public plotPoint(
    coords: [number, number],
    setupCtx: (ctx: CanvasRenderingContext2D) => void = () => {}
  ) {
    const [translatedX, translatedY] =
      this.transformationManager.systemToWorldCoords(coords);
    this.ctx.fillStyle = this.options.pixelOptions.pixelColor;
    setupCtx(this.ctx);
    this.ctx.beginPath();
    this.ctx.arc(
      translatedX,
      translatedY,
      this.options.pixelOptions.pixelSize,
      0,
      Math.PI * 2,
      false
    );
    this.ctx.fill();
    this.ctx.closePath();
  }

  public plotLine(
    line: string,
    setupCtx: (ctx: CanvasRenderingContext2D) => void = () => {}
  ) {
    const newLine = this.transformationManager.systemToWorldEqn(line);
    const trimmedCoords = this.getTrimmedLineCoords(newLine);
    if (trimmedCoords === null) {
      console.info(`Line ${line} outside of canvas`);
      return;
    }

    const { start, end } = trimmedCoords;

    const [startX, startY] = start;
    const [endX, endY] = end;

    this.ctx.strokeStyle = this.options.lineOptions.lineColor;
    this.ctx.lineWidth = this.options.lineOptions.lineWidth;
    setupCtx(this.ctx);
    this.ctx.beginPath();
    this.ctx.moveTo(startX, startY);
    this.ctx.lineTo(endX, endY);
    this.ctx.stroke();
  }

  private getTrimmedLineCoords(
    l: string
  ): { start: [number, number]; end: [number, number] } | null {
    const width = this.canvas.width;
    const height = this.canvas.height;

    // console.log({ l });

    const lineEqn = algebra.parse(l) as algebra.Equation;

    // console.log({ lineEqn: lineEqn.toString() });

    // Check is x exists in the equation
    const xExists = lineEqn.toString().includes("x");
    // Check is y exists in the equation
    const yExists = lineEqn.toString().includes("y");

    if (xExists && !yExists) {
      const xEqn = lineEqn.solveFor("x")?.valueOf();
      if (xEqn === undefined || typeof xEqn === "object")
        throw new Error("Invalid line");
      const x = xEqn;
      if (x < 0 || x > width) return null;
      else {
        return {
          start: [x, 0],
          end: [x, height],
        };
      }
    } else if (!xExists && yExists) {
      const yEqn = lineEqn.solveFor("y")?.valueOf();
      if (yEqn === undefined || typeof yEqn === "object")
        throw new Error("Invalid line");
      const y = yEqn;
      if (y < 0 || y > height) return null;
      else {
        return {
          start: [0, y],
          end: [width, y],
        };
      }
    } else if (!xExists && !yExists) {
      return null;
    } else {
      const x = lineEqn.solveFor("x")?.toString();
      const y = lineEqn.solveFor("y")?.toString();

      if (x === undefined || y === undefined) throw new Error("Invalid line");

      let startX = 0;
      let startY = math.evaluate(y, { x: startX });

      if (startY < 0) {
        startY = 0;
        startX = math.evaluate(x, { y: startY });
      } else if (startY > height) {
        startY = height;
        startX = math.evaluate(x, { y: startY });
      }

      let endX = width;
      let endY = math.evaluate(y, { x: endX });

      if (endY < 0) {
        endY = 0;
        endX = math.evaluate(x, { y: endY });
      } else if (endY > height) {
        endY = height;
        endX = math.evaluate(x, { y: endY });
      }

      const startCoords = [startX, startY] as [number, number];
      const endCoords = [endX, endY] as [number, number];

      return {
        start: startCoords,
        end: endCoords,
      };
    }
  }

  private configureCanvas() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;

    window.addEventListener("resize", () => this.resizeCanvas(), false);
  }

  private resizeCanvas() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  private drawAxes() {
    const drawStyles = (ctx: CanvasRenderingContext2D) => {
      // Make a dashed line to represent axes
      ctx.setLineDash([5, 15]);
      ctx.strokeStyle = "black";
      ctx.lineWidth = 2;
    };
    this.plotLine("x = 0", drawStyles);
    this.plotLine("y = 0", drawStyles);
  }

  private clearCanvas() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  public clearLines() {
    this.clearCanvas();
    this.drawAxes();
  }

  static create(
    canvas: HTMLCanvasElement,
    ctx: CanvasRenderingContext2D,
    options: CanvasOptions = {}
  ): GradientDescentCanvas {
    return new GradientDescentCanvas(canvas, ctx, options);
  }

  static generateLineEqn(slope: number, point: [number, number]) {
    const [x, y] = point;
    const b = y - slope * x;
    const eqn = `y = ${slope.toFixed(2)} * x + (${b.toFixed(2)})`;
    // console.log({ tangent: eqn });
    return eqn;
  }
}
