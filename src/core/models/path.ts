import { pairMap } from "../common/utils";
import { Baseplate } from "./baseplate";

export type PathKind = "ambiguous" | "spanning" | "auxiliary" | "single";

function distance(a: Baseplate, b: Baseplate): number {
  const [x1, y1] = a.center;
  const [x2, y2] = b.center;
  const dx = x1 - x2;
  const dy = y1 - y2;
  return Math.hypot(dx, dy);
}

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

  /** The distance directly from the origin to destination. */
  public get batDistance(): number {
    return distance(this.origin, this.destination);
  }

  /** The distance along the path from the origin to the destination. */
  public get snakeDistance(): number {
    return pairMap(this.baseplates, distance).reduce((a, b) => a + b, 0);
  }

  public get exclusiveSnakeDistance(): number {
    return Math.max(
      this.snakeDistance -
        this.origin.pearlRadius -
        this.destination.pearlRadius,
      0,
    );
  }
}
