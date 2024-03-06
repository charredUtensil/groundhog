import { Baseplate } from "./baseplate";

export type PathKind = "ambiguous" | "spanning" | "auxiliary";

/* A path through a series of Baseplates. */
export class Path {
  readonly id: number;
  readonly kind: PathKind;
  readonly baseplates: readonly Baseplate[];

  constructor(id: number, kind: PathKind, baseplates: readonly Baseplate[]) {
    this.id = id;
    this.kind = kind;
    this.baseplates = baseplates;
  }

  public get origin(): Baseplate {
    return this.baseplates[0];
  }

  public get destination(): Baseplate {
    return this.baseplates[this.baseplates.length - 1];
  }

  // The distance directly from the origin to destination.
  public get batDistance(): number {
    const [x1, y1] = this.origin.center;
    const [x2, y2] = this.destination.center;
    const dx = x1 - x2;
    const dy = y1 - y2;
    return Math.sqrt(dx * dx + dy * dy);
  }
}
