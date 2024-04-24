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

  uniformChoice<T>(choices: readonly T[]): T {
    return choices[this.uniformInt({ max: choices.length })];
  }

  betaChoice<T>(choices: readonly T[], { a, b }: { a: number; b: number }): T {
    return choices[this.betaInt({ a: a, b: b, max: choices.length })];
  }

  weightedChoice<T>(bids: readonly { bid: number; item: T }[]): T {
    const b = bids.filter((bid) => bid.bid > 0);
    const totalWeight = b.reduce((acc, bid) => acc + bid.bid, 0);
    let randomValue = this.uniform({ max: totalWeight });

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

/**
 * DO NOT REMOVE OR RE-ORDER THIS ENUM. APPEND NEW ENTRIES TO THE END.
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
  scriptGlobals,
  script,
  monsterSpawnScript,
  patch,
}

/**
 * A box of pseudo-random streams. Streams are separated into "kinds" - each one
 * having its own root seed. Some kinds are further separated by applying
 * a fixed numerical offset to these root seeds. The result is a pile of consistent
 * but mostly independent pseudo-random number generators that should prevent changes
 * in one area of cavern generation from affecting other areas.
 */
export class DiceBox {
  seed: number;
  private boxes: readonly {
    seed: Seed;
    rngs: Array<PseudorandomStream | undefined>;
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
    if (!r) {
      const seed = (box.seed + offset * 1999 + MAX_PLUS_ONE) % MAX_PLUS_ONE;
      r = new PseudorandomStream(seed);
      box.rngs[offset] = r;
    }
    return r;
  }

  init(id: number) {
    return this.prng(Die.init, id);
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
  pearl = (id: number) => this.prng(Die.pearl, id);
  prime = (id: number) => this.prng(Die.prime, id);
  rough = (id: number) => this.prng(Die.rough, id);

  get patch() {
    return this.prng(Die.patch, 0);
  }

  placeRechargeSeam = (id: number) => this.prng(Die.placeRechargeSeam, id);
  placeBuildings = (id: number) => this.prng(Die.placeBuildings, id);
  placeCrystals = (id: number) => this.prng(Die.placeCrystals, id);
  placeOre = (id: number) => this.prng(Die.placeOre, id);
  
  placeLandslides = (id: number) => this.prng(Die.placeLandslides, id);
  placeErosion = (id: number) => this.prng(Die.placeErosion, id);
  placeEntities = (id: number) => this.prng(Die.placeEntities, id);

  lore = (id: number) => this.prng(Die.lore, id);

  get scriptGlobals() {
    return this.prng(Die.scriptGlobals, 0);
  }

  script = (id: number) => this.prng(Die.script, id);
  monsterSpawnScript = (id: number) => this.prng(Die.monsterSpawnScript, id);
}
