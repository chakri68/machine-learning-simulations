import { derivative, isInteger, parse } from "mathjs";

export type GradientDescentCalcOptions = {
  learningRate: number;
  initialVals: { [x: string]: number };
  minStepSize: number;
  maxSteps: number;
};

export class GradientDescentCalc {
  public exp: math.MathNode;
  public derivatives: { [x: string]: math.MathNode };
  public vars: string[];
  private currVals: { [x: string]: number };
  private options: Omit<GradientDescentCalcOptions, "initialVals">;

  // Instance variables
  private iterationDetails: {
    count: number;
    steps: { [x: string]: number } | null;
  } = {
    count: 0,
    steps: null,
  };

  constructor(
    public func: math.MathExpression = "x^2+ 2*x + 1",
    vars: string[] = ["x"],
    options: GradientDescentCalcOptions
  ) {
    const { initialVals, ...reqOptions } = options;
    this.options = reqOptions;
    this.exp = parse(func);
    this.vars = vars;
    this.derivatives = this.getGradients();
    this.currVals = initialVals;
  }

  public getGradients() {
    const gradients: { [x: string]: math.MathNode } = {};
    for (const varName of this.vars) {
      gradients[varName] = derivative(this.exp, varName);
    }
    return gradients;
  }

  public getStepFromVar(varName: string) {
    return this.derivatives[varName].evaluate(this.currVals);
  }

  public getStep() {
    const steps: { [x: string]: number } = {};
    if (this.iterationDetails.count >= this.options.maxSteps) {
      return {
        steps: this.vars.reduce((acc: { [x: string]: number }, varName) => {
          acc[varName] = 0;
          return acc;
        }, {}),
        currVals: { ...this.currVals },
        iterationDetails: { ...this.iterationDetails },
      };
    }
    for (const varName of this.vars) {
      if (
        this.iterationDetails.steps?.[varName] &&
        this.iterationDetails.steps?.[varName] <= this.options.minStepSize
      ) {
        steps[varName] = 0;
      } else {
        steps[varName] =
          this.getStepFromVar(varName) * this.options.learningRate;
        this.currVals[varName] -= steps[varName];
      }
    }
    if (
      !Object.keys(steps).reduce(
        (acc, key) => (acc = acc && steps[key] === 0),
        true
      )
    ) {
      this.iterationDetails.count++;
      this.iterationDetails.steps = steps;
      return {
        steps,
        currVals: this.currVals,
        iterationDetails: this.iterationDetails,
      };
    }
    return {
      steps,
      currVals: { ...this.currVals },
      iterationDetails: { ...this.iterationDetails },
    };
  }

  public getVals() {
    return this.currVals;
  }
}
