import { mergeOptionals } from "@/lib/ts-utils";

export type Transformation = {
  rotation: number;
  scale: [number, number];
  translate: [number, number];
};

export class TransformationManager2D {
  private transformation: Transformation;
  constructor(transformation: Transformation) {
    this.transformation = transformation;
  }

  setTransformation(transformation: Partial<Transformation>) {
    this.transformation = mergeOptionals(transformation, this.transformation);
  }

  systemToWorldCoords(coords: [number, number]) {
    let [x, y] = coords;
    [x, y] = this.scaleSystemToWorldCoords(coords);
    [x, y] = this.translateSystemToWorldCoords([x, y]);
    [x, y] = this.rotateSystemToWorldCoords([x, y]);
    return [x, y];
  }

  systemToWorldEqn(eqn: string) {
    let newEqn = eqn;
    newEqn = this.scaleSystemToWorldEqn(newEqn);
    newEqn = this.translateSystemToWorldEqn(newEqn);
    newEqn = this.rotateSystemToWorldEqn(newEqn);
    return newEqn;
  }

  worldToSystemCoords(coords: [number, number]): [number, number] {
    let [x, y] = coords;
    [x, y] = this.scaleWorldToSystemCoords(coords);
    [x, y] = this.translateWorldToSystemCoords([x, y]);
    [x, y] = this.rotateWorldToSystemCoords([x, y]);
    return [x, y];
  }

  translateWorldToSystemCoords(coords: [number, number]): [number, number] {
    const [x, y] = coords;
    const [centerX, centerY] = this.transformation.translate;
    return [x - centerX, y - centerY];
  }

  translateSystemToWorldEqn(eqn: string): string {
    const [x, y] = this.transformation.translate;
    return eqn.replace(/x/g, `(x - (${x}))`).replace(/y/g, `(y - (${y}))`);
  }

  translateSystemToWorldCoords(coords: [number, number]): [number, number] {
    const [x, y] = coords;
    const [centerX, centerY] = this.transformation.translate;
    return [x + centerX, y + centerY];
  }

  translateWorldToSystemEqn(eqn: string): string {
    const [x, y] = this.transformation.translate;
    return eqn.replace(/x/g, `(x + (${x}))`).replace(/y/g, `(y + (${y}))`);
  }

  rotateWorldToSystemCoords(coords: [number, number]): [number, number] {
    const [x, y] = coords;
    const angle = this.transformation.rotation;
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    const xRotated = x * cos + y * sin;
    const yRotated = y * cos - x * sin;
    return [xRotated, yRotated];
  }

  rotateWorldToSystemEqn(eqn: string): string {
    const angle = this.transformation.rotation;
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    const newEqn = eqn
      .replace(/x/g, `((x * (${cos.toFixed(2)})) - (y * (${sin.toFixed(2)})))`)
      .replace(/y/g, `((y * (${cos.toFixed(2)})) + (x * (${sin.toFixed(2)})))`);
    return newEqn;
  }

  rotateSystemToWorldCoords(coords: [number, number]): [number, number] {
    const [x, y] = coords;
    const angle = this.transformation.rotation;
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    const xRotated = x * cos - y * sin;
    const yRotated = y * cos + x * sin;
    return [xRotated, yRotated];
  }

  rotateSystemToWorldEqn(eqn: string): string {
    const angle = this.transformation.rotation;
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    const newEqn = eqn
      .replace(/x/g, `((x * (${cos.toFixed(2)})) + (y * (${sin.toFixed(2)})))`)
      .replace(/y/g, `((y * (${cos.toFixed(2)})) - (x * (${sin.toFixed(2)})))`);
    return newEqn;
  }

  scaleSystemToWorldCoords(coords: [number, number]): [number, number] {
    const [x, y] = coords;
    const [scaleX, scaleY] = this.transformation.scale;
    return [x * scaleX, y * scaleY];
  }

  scaleSystemToWorldEqn(eqn: string): string {
    const [scaleX, scaleY] = this.transformation.scale;
    const newEqn = eqn
      .replace(/x/g, `(x / (${scaleX.toFixed(2)}))`)
      .replace(/y/g, `(y / (${scaleY.toFixed(2)}))`);
    return newEqn;
  }

  scaleWorldToSystemCoords(coords: [number, number]): [number, number] {
    const [x, y] = coords;
    const [scaleX, scaleY] = this.transformation.scale;
    return [x / scaleX, y / scaleY];
  }

  scaleWorldToSystemEqn(eqn: string): string {
    const [scaleX, scaleY] = this.transformation.scale;
    const newEqn = eqn
      .replace(/x/g, `(x * (${scaleX.toFixed(2)}))`)
      .replace(/y/g, `(y * (${scaleY.toFixed(2)}))`);
    return newEqn;
  }
}
