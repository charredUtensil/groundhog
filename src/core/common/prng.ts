import beta from "@stdlib/random-base-beta";
import mt19937 from "@stdlib/random-base-mt19937";
import { Mutable } from "./type_util";

export type Seed = number;

export type PseudorandomStream = {
  chance(chance: number): boolean;
  uniform(args: { min?: number; max?: number }): number;
  beta(args: { a: number; b: number; min?: number; max?: number }): number;
  uniformInt(args: { min?: number; max: number }): number;
  betaInt(args: { a: number; b: number; min?: number; max: number }): number;
  uniformChoice<T>(choices: Iterable<T>): T;
  betaChoice<T>(choices: Iterable<T>, args: { a: number; b: number }): T;
  weightedChoice<T>(bids: Iterable<{ bid: number; item: T }>): T;
};

function prng(seed: Seed): PseudorandomStream {
  const mt = mt19937.factory({ seed });
  const bt = beta.factory({ state: mt.state, copy: false });

  function ur({ min = 0, max = 1 }) {
    return min + (mt() * (max - min)) / mt.MAX;
  }
  const br: PseudorandomStream["beta"] = ({ a, b, min = 0, max = 1 }) => {
    return min + bt(a, b) * (max - min);
  };

  return {
    chance(chance) {
      return mt() < chance * mt.MAX;
    },
    uniform: ur,
    beta: br,
    uniformInt(args) {
      return Math.floor(ur(args));
    },
    betaInt(args) {
      return Math.floor(br(args));
    },
    uniformChoice(choices) {
      const c = Array.from(choices);
      return c[Math.floor(ur({ max: c.length }))];
    },
    betaChoice(choices, { a, b }) {
      const c = Array.from(choices);
      return c[Math.floor(br({ a: a, b: b, max: c.length }))];
    },
    weightedChoice(bids) {
      const b = [...bids].filter((bid) => bid.bid > 0);
      const totalWeight = b.reduce((acc, bid) => acc + bid.bid, 0);
      let randomValue = ur({ max: totalWeight });

      for (const { bid, item } of bids) {
        randomValue -= bid;
        if (randomValue <= 0) {
          return item;
        }
      }
      return b[b.length - 1].item;
    },
  };
}

enum Die {
  partition = 0,
  weave,
  flood,
  conquest,
}

export class DiceBox {
  private boxes: readonly {
    seed: Seed;
    rngs: Array<PseudorandomStream | undefined>;
  }[];

  constructor(seed: Seed) {
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
      const seed = (box.seed + offset * 1999 + mt19937.MAX) % mt19937.MAX;
      r = prng(seed);
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

  get conquest() {
    return this.prng(Die.conquest, 0);
  }
}
