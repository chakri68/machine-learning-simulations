import { isCanvas } from "@/lib/canvas-utils";
import { GradientDescentCalc } from "./GradientDescent";
import { create, all } from "mathjs";
import { GradientDescentCanvas } from "./GradientDescentCanvas";
import "../styles/index.scss";
import { asyncSleep } from "@/lib/ts-utils";

const config = {};
const math = create(all, config);

const canvas = document.getElementById("canvas");

if (!isCanvas(canvas)) {
  throw new Error("Canvas not found");
}

const ctx = canvas.getContext("2d");

if (!ctx) {
  throw new Error("Could not get canvas context");
}

const manager = GradientDescentCanvas.create(canvas, ctx, {
  transformation: {
    rotation: 0,
    scale: [10, -10],
    translate: [window.innerWidth / 2, window.innerHeight / 2],
  },
});

const simpleGradientDescentCalc = new GradientDescentCalc(
  // "x ^ 2 + y ^ 2",
  "(1 - x) ^ 2 + 100 * (y - x ^ 2) ^ 2",
  ["x", "y"],
  {
    initialVals: {
      x: 2,
      y: 2,
    },
    learningRate: 0.0001,
    maxSteps: 1000,
    minStepSize: 10e-2,
  }
);

let data;

simpleGradientDescentCalc.registerCallback(async (data) => {
  data = data;
  console.log({ data: structuredClone(data) });
  await asyncSleep(50);
  // Draw a green point at [data.currVals["x"], data.currVals["y"]]
  manager.plotPoint([data.currVals["x"], data.currVals["y"]]);
  manager.plotLine(
    GradientDescentCanvas.generateLineEqn(data.iterationDetails.steps["y"], [
      data.currVals["x"],
      data.currVals["y"],
    ]),
    (ctx) => {
      ctx.setLineDash([]);
      ctx.strokeStyle = "rgba(255, 0, 0, 0.5)";
      ctx.lineWidth = 1;
    }
  );
});
simpleGradientDescentCalc.start();
console.log({ bestSolution: data });
