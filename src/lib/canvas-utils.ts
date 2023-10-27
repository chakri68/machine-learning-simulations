export function setupCanvas(canvas: HTMLCanvasElement) {
  // Add event listeners for resize
  const resizeCanvas = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  };
  window.addEventListener("resize", resizeCanvas, false);
}

export function isCanvas(
  canvasEl: HTMLElement | null
): canvasEl is HTMLCanvasElement {
  try {
    // @ts-ignore
    const ctx = canvasEl?.getContext("2d");
    return true;
  } catch (err) {
    console.error(`Error resolving canvas: ${err}`);
    return false;
  }
}

export type CanvasDrawOptions = {
  color?: string;
  lineWidth?: number;
};
