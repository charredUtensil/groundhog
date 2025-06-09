import beta from "@stdlib/random-base-beta";
import mt19937 from "@stdlib/random-base-mt19937";
import { Mutable } from "./utils";

export type Seed = number;

export const MAX_PLUS_ONE = mt19937.MAX + 1;

export class PseudorandomStream {
  private mt;
  private bt;

  constructor(seed: Seed) {
    this.mt = mt19937.factory({ seed });
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    this.bt = beta.factory({ state: this.mt.state, copy: false });
  }

  chance(chance: number): boolean {
    return this.mt() < chance * MAX_PLUS_ONE;
  }

  uniform({ min = 0, max = 1 }): number {
    return min + (this.mt() * (max - min)) / MAX_PLUS_ONE;
  }

  // https://mathlets.org/mathlets/beta-distribution/
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

  uniformChoice<T>(choices: readonly T[]): T {
    const max = choices.length;
    if (max === 0) {
      throw new Error("No choices given.");
    }
    return choices[this.uniformInt({ max })];
  }

  betaChoice<T>(choices: readonly T[], { a, b }: { a: number; b: number }): T {
    const max = choices.length;
    if (max === 0) {
      throw new Error("No choices given.");
    }
    return choices[this.betaInt({ a, b, max })];
  }

  weightedChoice<T>(bids: readonly { bid: number; item: T }[]): T {
    const b = bids.filter((bid) => bid.bid > 0);
    const max = b.reduce((acc, bid) => acc + bid.bid, 0);
    if (max === 0) {
      throw new Error("No positive bids given.");
    }
    let randomValue = this.uniform({ max });

    for (const { bid, item } of b) {
      randomValue -= bid;
      if (randomValue <= 0) {
        return item;
      }
    }
    return b[b.length - 1].item;
  }

  shuffle<T>(choices: readonly T[]): T[] {
    const r: T[] = [];
    for (let i = 0; i < choices.length; i++) {
      const j = Math.floor((this.mt() * i) / MAX_PLUS_ONE);
      if (i !== j) {
        r[i] = r[j];
      }
      r[j] = choices[i];
    }
    return r;
  }
}

/*
 * DO NOT RE-ORDER THIS ENUM!
 * ALWAYS APPEND NEW ENTRIES TO THE END!
 *
 * Otherwise, new versions of groundHog will generate wildly different caverns
 * from the same seeds in a previous version.
 */
enum Die {
  init = 0,
  partition,
  weave,
  flood,
  pickSpawn,
  pickArchitect,
  pearl,
  prime,
  rough,
  placeRechargeSeam,
  placeBuildings,
  placeCrystals,
  placeOre,
  placeLandslides,
  placeErosion,
  placeEntities,
  lore,
  mod,
  script,
  monsterSpawnScript,
  brace,
  height,
  placeSlugHoles,
  slugSpawnScript,
}

export enum LoreDie {
  premise = 0,
  orders,
  success,
  failure,
  foundHoard,
  foundHq,
  foundAllLostMiners,
  nomadsSettled,
  foundSlugNest,
  name,
  failureBaseDestroyed,
  buildAndPower,
  seismicForeshadow,
  pandora,
}

const SEALED = Symbol("sealed");

/**
 * A box of pseudo-random streams. Streams are separated into "kinds" - each one
 * having its own root seed. Some kinds are further separated by applying
 * a fixed numerical offset to these root seeds. The result is a pile of consistent
 * but mostly independent pseudo-random number generators that should prevent
 * independent changes in one area of cavern generation from affecting other areas.
 */
export class DiceBox {
  seed: number;
  private boxes: readonly {
    seed: Seed;
    rngs: Array<PseudorandomStream | typeof SEALED>;
  }[];

  constructor(seed: Seed) {
    this.seed = seed;
    // Patch for https://github.com/stdlib-js/stdlib/issues/1963
    if (seed === 0) {
      seed = 1999;
    }
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
    if (r) {
      if (Object.is(r, SEALED)) {
        throw new Error(`prng at [${die},${offset}] was sealed`);
      }
      return r as PseudorandomStream;
    }
    const seed = (box.seed + offset * 1999 + MAX_PLUS_ONE) % MAX_PLUS_ONE;
    r = new PseudorandomStream(seed);
    box.rngs[offset] = r;
    return r;
  }

  init(id: number) {
    return this.prng(Die.init, id);
  }

  seal() {
    this.boxes.forEach((box) =>
      box.rngs.forEach((_, i) => (box.rngs[i] = SEALED)),
    );
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

  pickArchitect = (id: number) => this.prng(Die.pickArchitect, id);
  mod = (id: number) => this.prng(Die.mod, id);
  prime = (id: number) => this.prng(Die.prime, id);
  pearl = (id: number) => this.prng(Die.pearl, id);
  rough = (id: number) => this.prng(Die.rough, id);

  get brace() {
    return this.prng(Die.brace, 0);
  }

  placeRechargeSeam = (id: number) => this.prng(Die.placeRechargeSeam, id);
  placeBuildings = (id: number) => this.prng(Die.placeBuildings, id);
  placeCrystals = (id: number) => this.prng(Die.placeCrystals, id);
  placeOre = (id: number) => this.prng(Die.placeOre, id);
  placeSlugHoles = (id: number) => this.prng(Die.placeSlugHoles, id);

  placeLandslides = (id: number) => this.prng(Die.placeLandslides, id);
  placeErosion = (id: number) => this.prng(Die.placeErosion, id);
  placeEntities = (id: number) => this.prng(Die.placeEntities, id);

  lore = (id: LoreDie) => this.prng(Die.lore, id);

  get height() {
    return this.prng(Die.height, 0);
  }

  script = (id: number) => this.prng(Die.script, id);
  monsterSpawnScript = (id: number) => this.prng(Die.monsterSpawnScript, id);
  slugSpawnScript = (id: number) => this.prng(Die.slugSpawnScript, id);
}
