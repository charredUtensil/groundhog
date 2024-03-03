import beta from "@stdlib/random-base-beta";
import mt19937 from "@stdlib/random-base-mt19937";

export type Seed = number;

export type PseudorandomStream = {
  chance(chance: number): boolean
  uniform(args: {min?: number, max?: number}): number
  beta(args: {a: number, b: number, min?: number, max?: number}): number
  uniform_int(args: {min?: number, max: number}): number
  beta_int(args: {a: number, b: number, min?: number, max: number}): number
  uniform_choice<T>(choices: Iterable<T>): T
  beta_choice<T>(choices: Iterable<T>, args: {a: number, b: number}): T
  weighted_choice<T>(bids: Iterable<{bid: number, item: T}>): T
}

function prng(seed: Seed): PseudorandomStream {
  const mt = mt19937.factory({seed: seed})
  const bt = beta.factory({state: mt.state, copy: false})

  function ur({min = 0, max = 1}) {
    return min + mt() * (max - min) / mt.MAX
  }
  const br: PseudorandomStream['beta'] = ({a, b, min = 0, max = 1}) => {
    return min + bt(a, b) * (max - min)
  }

  return {
    chance(chance) {
      return mt() < chance * mt.MAX
    },
    uniform: ur,
    beta: br,
    uniform_int(args) {
      return Math.floor(ur(args))
    },
    beta_int(args) {
      return Math.floor(br(args))
    },
    uniform_choice(choices) {
      const c = Array.from(choices)
      return c[Math.floor(ur({max: c.length}))]
    },
    beta_choice(choices, {a, b}) {
      const c = Array.from(choices)
      return c[Math.floor(br({a: a, b: b, max: c.length}))]
    },
    weighted_choice(bids) {
      const b = [...bids].filter((bid) => bid.bid > 0);
      const totalWeight = b.reduce((acc, bid) => acc + bid.bid, 0);
      let randomValue = ur({max: totalWeight});
    
      for (const { bid, item } of bids) {
        randomValue -= bid;
        if (randomValue <= 0) {
          return item;
        }
      }
      return b[b.length - 1].item;
    },
  }
}

export type DiceBox = {
}