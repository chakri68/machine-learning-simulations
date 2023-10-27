import { OptionalObjectOf, mergeOptionals } from "@/lib/ts-utils";
import { derivative, parse } from "mathjs";

export type GradientDescentCalcOptions = {
  learningRate: number;
  initialVals: { [x: string]: number };
  minStepSize: number;
  maxSteps: number;
  callback?: (details: {
    currVals: { [x: string]: number };
    iterationDetails: {
      count: number;
      steps: { [x: string]: number };
    };
  }) => void | Promise<void>;
};

export class GradientDescentCalc {
  public exp: math.MathNode;
  public derivatives: { [x: string]: math.MathNode };
  public vars: string[];
  private currVals: { [x: string]: number };
  private options: Required<GradientDescentCalcOptions>;

  // Instance variables
  private iterationDetails: {
    count: number;
    steps: { [x: string]: number };
  } = {
    count: 0,
    steps: {},
  };

  constructor(
    public func: math.MathExpression = "x^2+ 2*x + 1",
    vars: string[] = ["x"],
    options: GradientDescentCalcOptions
  ) {
    const defaultOptions: OptionalObjectOf<GradientDescentCalcOptions> = {
      callback: () => {},
    };
    this.options = mergeOptionals(options, defaultOptions);
    this.exp = parse(func);
    this.vars = vars;
    this.derivatives = this.getGradients();
    this.currVals = this.options.initialVals;
  }

  public getGradients() {
    const gradients: { [x: string]: math.MathNode } = {};
    for (const varName of this.vars) {
      gradients[varName] = derivative(this.exp, varName);
    }
    return gradients;
  }

  public async start() {
    for (let i = 0; i < this.options.maxSteps; i++) {
      const { stop, ...data } = this.getStep();
      await this.options.callback(data);
      if (stop === true) break;
    }
  }

  public getStepFromVar(varName: string) {
    return this.derivatives[varName].evaluate(this.currVals);
  }

  private getStep(): {
    currVals: { [x: string]: number };
    iterationDetails: {
      count: number;
      steps: { [x: string]: number };
    };
  } & { stop?: boolean } {
    const steps: { [x: string]: number } = {};
    this.iterationDetails.count++;
    for (const varName of this.vars) {
      if (
        this.iterationDetails.steps[varName] &&
        Math.abs(this.iterationDetails.steps[varName]) <=
          this.options.minStepSize
      ) {
        steps[varName] = 0;
      } else {
        steps[varName] =
          this.getStepFromVar(varName) * this.options.learningRate;
        this.currVals[varName] -= steps[varName];
      }
    }
    this.iterationDetails.steps = steps;
    if (
      this.iterationDetails.count >= this.options.maxSteps ||
      Object.keys(steps).reduce(
        (acc, key) => (acc = acc && steps[key] === 0),
        true
      )
    ) {
      console.log(
        "Reasone for stopping:",
        this.iterationDetails.count >= this.options.maxSteps
          ? "Max steps reached"
          : "Min step size reached"
      );
    }
    return {
      currVals: this.currVals,
      iterationDetails: this.iterationDetails,
      stop:
        this.iterationDetails.count >= this.options.maxSteps ||
        Object.keys(steps).reduce(
          (acc, key) => (acc = acc && steps[key] === 0),
          true
        ),
    };
  }

  public registerCallback(callback: typeof this.options.callback) {
    this.options.callback = callback;
  }

  public getVals() {
    return this.currVals;
  }
}
