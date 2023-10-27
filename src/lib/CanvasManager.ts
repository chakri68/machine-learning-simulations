export class CanvasManager {
  public ctx: CanvasRenderingContext2D;
  constructor(public canvasEl: HTMLCanvasElement) {
    this.ctx = canvasEl.getContext("2d") as CanvasRenderingContext2D;

    this.resizeCanvas();
    this.addEventListeners();
  }

  private addEventListeners() {
    // Resize
    window.addEventListener("resize", this.resizeCanvas.bind(this));
  }

  private resizeCanvas() {
    this.canvasEl.width = window.innerWidth;
    this.canvasEl.height = window.innerHeight;
  }
}
