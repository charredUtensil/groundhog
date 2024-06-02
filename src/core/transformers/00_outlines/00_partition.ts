import { CavernContext, DiceBox, PseudorandomStream } from "../../common";
import { Baseplate } from "../../models/baseplate";
import { BaseCavern } from "../../models/cavern";

export type PartitionedCavern = BaseCavern & {
  baseplates: readonly Baseplate[];
};

const BASEPLATE_MIN_SIZE = 3;

// Cuts the space into Baseplates.
class Partitioner {
  private readonly context: CavernContext;
  private readonly baseplateMaxSize: number;
  private readonly rng: PseudorandomStream;
  private readonly queue: Baseplate[];
  private readonly outbox: Baseplate[];
  private nextId: number = 0;

  constructor({ context, dice }: { context: CavernContext; dice: DiceBox }) {
    this.context = context;
    this.rng = dice.partition;
    this.baseplateMaxSize = Math.max(
      Math.round(context.targetSize * context.baseplateMaxRatioOfSize),
      3,
    );

    const bound = context.targetSize >> 1;
    this.queue = [
      new Baseplate(this.id(), -bound, -bound, bound, bound, "stock"),
    ];
    this.outbox = [];
  }

  private id(): number {
    return this.nextId++;
  }

  private clone(
    bp: Baseplate,
    id: number,
    args: {
      left?: number;
      top?: number;
      right?: number;
      bottom?: number;
    },
  ) {
    const r = new Baseplate(
      id,
      args.left ?? bp.left,
      args.top ?? bp.top,
      args.right ?? bp.right,
      args.bottom ?? bp.bottom,
      "stock",
    );
    if (Math.min(r.width, r.height) >= BASEPLATE_MIN_SIZE) {
      this.queue.push(r);
    }
  }

  public get baseplates(): readonly Baseplate[] {
    return [...this.queue, ...this.outbox];
  }

  public get done(): boolean {
    return this.queue.length === 0;
  }

  // Perform one step of partitioning.
  public step(): void {
    const queue = [...this.queue];
    this.queue.length = 0;
    for (const bp of queue) {
      this.split(bp);
    }
  }

  private split(bp: Baseplate) {
    if (bp.width > bp.height * 2) {
      // Cut vertically
      const x = this.rng.betaInt({
        a: 5,
        b: 5,
        min: bp.left + 1,
        max: bp.right,
      });
      this.clone(bp, bp.id, { right: x });
      this.clone(bp, this.id(), { left: x });
    } else if (bp.height > bp.width * 2) {
      // Cut horizontally
      const y = this.rng.betaInt({
        a: 5,
        b: 5,
        min: bp.top + 1,
        max: bp.bottom,
      });
      this.clone(bp, bp.id, { bottom: y });
      this.clone(bp, this.id(), { top: y });
    } else {
      // Determine size to clip from center
      let w = this.rng.betaInt({
        a: 5,
        b: 2.5,
        min: 3,
        max: Math.min(this.baseplateMaxSize, bp.width),
      });
      let h = this.rng.betaInt({
        a: 5,
        b: 2.5,
        min: 3,
        max: Math.min(this.baseplateMaxSize, bp.height),
      });
      // Limit to max oblongness
      w = Math.min(w, h + this.context.baseplateMaxOblongness);
      h = Math.min(h, w + this.context.baseplateMaxOblongness);
      // Determine where to place this baseplate in the open space
      const x1 = this.rng.uniformInt({ min: bp.left, max: bp.right - w });
      const y1 = this.rng.uniformInt({ min: bp.top, max: bp.bottom - h });
      const x2 = x1 + w;
      const y2 = y1 + h;
      // Clip the baseplate itself from the center
      if (Math.min(w, h) >= BASEPLATE_MIN_SIZE) {
        if (Math.max(w, h) <= this.baseplateMaxSize) {
          this.outbox.push(new Baseplate(bp.id, x1, y1, x2, y2, "ambiguous"));
        } else {
          this.queue.push(new Baseplate(bp.id, x1, y1, x2, y2, "stock"));
        }
      }
      // Randomly clip the four pieces around clockwise or counterclockwise
      if (this.rng.chance(0.5)) {
        this.clone(bp, this.id(), { right: x1, bottom: y2 });
        this.clone(bp, this.id(), { left: x1, bottom: y1 });
        this.clone(bp, this.id(), { left: x2, top: y1 });
        this.clone(bp, this.id(), { right: x2, top: y2 });
      } else {
        this.clone(bp, this.id(), { right: x2, bottom: y1 });
        this.clone(bp, this.id(), { left: x2, bottom: y2 });
        this.clone(bp, this.id(), { left: x1, top: y2 });
        this.clone(bp, this.id(), { right: x1, top: y1 });
      }
    }
  }
}

export default function partition(cavern: BaseCavern): PartitionedCavern {
  const partitioner = new Partitioner(cavern);
  while (!partitioner.done) {
    partitioner.step();
  }
  return { ...cavern, baseplates: partitioner.baseplates };
}
