import { CanvasManager } from "@/lib/CanvasManager";
import { GradientDescentCalc } from "./GradientDescent";
import { create, all } from "mathjs";
const config = {};
const math = create(all, config);

const canvas = document.getElementById("canvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

const canvasManager = new CanvasManager(canvas);
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

for (let i = 0; i < 1000; i++) {
  simpleGradientDescentCalc.getStep();
}

console.log(simpleGradientDescentCalc.getStep());
console.log({ finalVals: simpleGradientDescentCalc.getVals() });
