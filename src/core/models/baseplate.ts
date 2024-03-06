export type BaseplateKind = 'stock' | 'ambiguous' | 'cave' | 'hall'

/* A rectangular space that we can build on. */
export class Baseplate {
  readonly id: number;
  readonly left: number;
  readonly top: number;
  readonly right: number;
  readonly bottom: number;
  readonly kind: BaseplateKind;

  constructor(
    id: number, left: number, top: number, right: number, bottom: number, 
    kind: BaseplateKind) {
    this.id = id
    this.left = left
    this.top = top
    this.right = right
    this.bottom = bottom
    this.kind = kind
  }

  get width(): number {
    return this.right - this.left;
  }

  get height(): number {
    return this.bottom - this.top;
  }

  get area(): number {
    return this.width * this.height
  }

  get center(): [number, number] {
    return [this.left + this.width / 2, this.top + this.height / 2];
  }

  /* Returns whether these Baseplates can be combined into one big Cave. */
  isMergeable(other: Baseplate): boolean {
    for (const a of [this, other]) {
      for (const b of [this, other]) {
        for (const [ua, ub, va1, va2, vb1, vb2] of [
          [a.right, b.left, a.top, a.bottom, b.top, b.bottom],
          [a.bottom, b.top, a.left, a.right, b.left, b.right],
        ]) {
          if (ua === ub && Math.min(va2, vb2) - Math.max(va1, vb1) > Math.max(va2 - va1, vb2 - vb1) / 2) {
            return true;
          }
        }
      }
    }
    return false;
  }

  withKind(kind: BaseplateKind): Baseplate {
    return new Baseplate(
      this.id,
      this.left,
      this.top,
      this.right,
      this.bottom,
      kind
    )
  }

  get pearlRadius(): number {
    return Math.min(this.width, this.height) >> 1;
  }
}