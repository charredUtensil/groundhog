import beta from "@stdlib/random-base-beta";
import mt19937 from "@stdlib/random-base-mt19937";
import { Mutable } from "./utils";

export type Seed = number;

const MAX_PLUS_ONE = mt19937.MAX + 1;

export class PseudorandomStream {
  private mt;
  private bt;

  constructor(seed: Seed) {
    this.mt = mt19937.factory({ seed });
    this.bt = beta.factory({ state: this.mt.state, copy: false });
  }

  chance(chance: number): boolean {
    return this.mt() < chance * MAX_PLUS_ONE;
  }

  uniform({ min = 0, max = 1 }): number {
    return min + (this.mt() * (max - min)) / MAX_PLUS_ONE;
  }

  beta({
    a,
    b,
    min = 0,
    max = 1,
  }: {
    a: number;
    b: number;
    min?: number;
    max?: number;
  }): number {
    return min + this.bt(a, b) * (max - min);
  }

  uniformInt(args: { min?: number; max: number }) {
    return Math.floor(this.uniform(args));
  }

  betaInt(args: { a: number; b: number; min?: number; max?: number }): number {
    return Math.floor(this.beta(args));
  }

  uniformChoice<T>(choices: T[]): T {
    return choices[this.uniformInt({ max: choices.length })];
  }

  betaChoice<T>(choices: T[], { a, b }: { a: number; b: number }): T {
    return choices[this.betaInt({ a: a, b: b, max: choices.length })];
  }

  weightedChoice<T>(bids: { bid: number; item: T }[]): T {
    const b = bids.filter((bid) => bid.bid > 0);
    const totalWeight = b.reduce((acc, bid) => acc + bid.bid, 0);
    let randomValue = this.uniform({ max: totalWeight });

    for (const { bid, item } of bids) {
      randomValue -= bid;
      if (randomValue <= 0) {
        return item;
      }
    }
    return b[b.length - 1].item;
  }
}

enum Die {
  partition = 0,
  weave,
  flood,
  pickSpawn,
  pickArchitect,
  pearl,
  rough,
  placeRechargeSeam,
  placeBuildings,
  placeCrystals,
  placeOre,
  placeLandslides,
  placeErosion,
  placeEntities,
}

export class DiceBox {
  seed: number;
  private boxes: readonly {
    seed: Seed;
    rngs: Array<PseudorandomStream | undefined>;
  }[];

  constructor(seed: Seed) {
    this.seed = seed;
    const mt = mt19937.factory({ seed });
    const boxesLength = Object.keys(Die).length;
    const boxes: Mutable<DiceBox["boxes"]> = [];
    for (let i = 0; i < boxesLength; i++) {
      boxes[i] = { seed: mt(), rngs: [] };
    }
    this.boxes = boxes;
  }

  private prng(die: Die, offset: number): PseudorandomStream {
    const box = this.boxes[die];
    let r = box.rngs[offset];
    if (!r) {
      const seed = (box.seed + offset * 1999 + MAX_PLUS_ONE) % MAX_PLUS_ONE;
      r = new PseudorandomStream(seed);
      box.rngs[offset] = r;
    }
    return r;
  }

  get partition() {
    return this.prng(Die.partition, 0);
  }

  get weave() {
    return this.prng(Die.weave, 0);
  }

  get flood() {
    return this.prng(Die.flood, 0);
  }

  get pickSpawn() {
    return this.prng(Die.pickSpawn, 0);
  }

  pickArchitect     = (id: number) => this.prng(Die.pickArchitect, id);
  pearl             = (id: number) => this.prng(Die.pearl, id);
  rough             = (id: number) => this.prng(Die.rough, id);
  placeRechargeSeam = (id: number) => this.prng(Die.placeRechargeSeam, id);
  placeBuildings    = (id: number) => this.prng(Die.placeBuildings, id);
  placeCrystals     = (id: number) => this.prng(Die.placeCrystals, id);
  placeOre          = (id: number) => this.prng(Die.placeOre, id);
  placeLandslides   = (id: number) => this.prng(Die.placeLandslides, id);
  placeErosion      = (id: number) => this.prng(Die.placeErosion, id);
  placeEntities     = (id: number) => this.prng(Die.placeEntities, id);
}
