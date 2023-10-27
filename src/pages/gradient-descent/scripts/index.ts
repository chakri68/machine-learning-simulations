import { isCanvas } from "@/lib/canvas-utils";
import { GradientDescentCalc } from "./GradientDescent";
import { create, all } from "mathjs";
import { GradientDescentCanvas } from "./GradientDescentCanvas";
import "../styles/index.scss";

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

const manager = GradientDescentCanvas.create(canvas, ctx);

manager.drawLine("x - 2y + 5 = 0", (ctx) => {
  // Remove the line dash
  ctx.setLineDash([]);
  ctx.strokeStyle = "red";
  ctx.lineWidth = 5;
});

const simpleGradientDescentCalc = new GradientDescentCalc(
  "x^2 + y^2",
  ["x", "y"],
  {
    initialVals: {
      x: 1,
      y: 1,
    },
    learningRate: 0.01,
    maxSteps: 1000,
    minStepSize: 0.0001,
  }
);

simpleGradientDescentCalc.registerCallback((data) => {
  if (data.iterationDetails.count === 1000) {
    console.log(data);
  }
});
simpleGradientDescentCalc.start();
