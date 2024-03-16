import { Point } from "../common/geometry";

export type BaseplateKind = "stock" | "ambiguous" | "cave" | "hall";

/* A rectangular space that we can build on. */
export class Baseplate {
  readonly id: number;
  readonly left: number;
  readonly top: number;
  readonly right: number;
  readonly bottom: number;
  readonly kind: BaseplateKind;

  constructor(
    id: number,
    left: number,
    top: number,
    right: number,
    bottom: number,
    kind: BaseplateKind,
  ) {
    this.id = id;
    this.left = left;
    this.top = top;
    this.right = right;
    this.bottom = bottom;
    this.kind = kind;
  }

  get width(): number {
    return this.right - this.left;
  }

  get height(): number {
    return this.bottom - this.top;
  }

  get area(): number {
    return this.width * this.height;
  }

  get center(): Point {
    return [this.left + this.width / 2, this.top + this.height / 2];
  }

  withKind(kind: BaseplateKind): Baseplate {
    return new Baseplate(
      this.id,
      this.left,
      this.top,
      this.right,
      this.bottom,
      kind,
    );
  }

  get pearlRadius(): number {
    return Math.min(this.width, this.height) >> 1;
  }
}
