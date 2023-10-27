import { CanvasDrawOptions } from "@/lib/canvas-utils";
import { OptionalObjectOf, mergeOptionals } from "@/lib/ts-utils";
import algebra from "algebra.js";
import { create, all } from "mathjs";

const math = create(all, {});

export class GradientDescentCanvas {
  constructor(
    public canvas: HTMLCanvasElement,
    public ctx: CanvasRenderingContext2D
  ) {
    this.configureCanvas();
    this.drawAxes();
  }

  public drawLine(
    line: string,
    setupCtx: (ctx: CanvasRenderingContext2D) => void = () => {}
  ) {
    const trimmedCoords = this.getTrimmedLineCoords(line);
    if (trimmedCoords === null) {
      console.info(`Line ${line} outside of canvas`);
      return;
    }

    const { start, end } = trimmedCoords;

    const [startX, startY] = start;
    const [endX, endY] = end;

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

    const newLine = this.translateEqn(this.flipEqn(l));
    const lineEqn = algebra.parse(newLine) as algebra.Equation;

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

  private translateEqn(eqn: string): string {
    // replace x with (x - width / 2)
    // replace y with (y -height / 2)
    const width = this.canvas.width;
    const height = this.canvas.height;

    const newEqn = eqn
      .replace(/x/g, `(x - ${width / 2})`)
      .replace(/y/g, `(y - ${height / 2})`);

    return newEqn;
  }

  private rotateEqn(eqn: string, angle: number): string {
    // replace x with ((y * sin(theta)) - (x * cos(theta)))
    // replace y with ((y * cos(theta)) + (x * sin(theta)))
    const newEqn = eqn
      .replace(/x/g, `((y * ${Math.sin(angle)}) - (x * ${Math.cos(angle)}))`)
      .replace(/y/g, `((y * ${Math.cos(angle)}) + (x * ${Math.sin(angle)}))`);
    return newEqn;
  }

  private flipEqn(eqn: string, axis: "x" | "y" = "y"): string {
    if (axis === "x") {
      // replace x with -x
      const newEqn = eqn.replace(/x/g, `(-x)`);
      return newEqn;
    } else {
      // replace y with -y
      const newEqn = eqn.replace(/y/g, `(-y)`);
      return newEqn;
    }
  }

  private drawAxes() {
    const drawStyles = (ctx: CanvasRenderingContext2D) => {
      // Make a dashed line to represent axes
      ctx.setLineDash([5, 15]);
      ctx.strokeStyle = "black";
      ctx.lineWidth = 2;
    };
    this.drawLine("x = 0", drawStyles);
    this.drawLine("y = 0", drawStyles);
  }

  static create(
    canvas: HTMLCanvasElement,
    ctx: CanvasRenderingContext2D
  ): GradientDescentCanvas {
    return new GradientDescentCanvas(canvas, ctx);
  }
}
