import { Logger } from "./logger";
import { DiceBox } from "./prng";

export type Biome = "rock" | "ice" | "lava";
export type Curve = {
  readonly base: number;
  readonly hops: number;
  readonly order: number;
};

export type CavernContext = {
  logger: Logger;
  seed: number;
  /**
   * Which biome this map is in.
   */
  biome: Biome;

  /**
   * The "target" final size for the cavern.
   * The final size may be larger or smaller due to randomness -
   * larger caverns will not be cropped to fit.
   */
  targetSize: number;
  baseplateMaxOblongness: number;
  /**
   * Baseplates may be at most this ratio of the target size.
   */
  baseplateMaxRatioOfSize: number;
  /**
   * Promote this many baseplates to become caves.
   * The higher this number is, the more "busy" the final map will be.
   */
  caveCount: number;
  /**
   * Add this many extra redundant paths.
   */
  auxiliaryPathCount: number;
  /**
   * Auxiliary paths will not be chosen if they make an angle less than this
   * with another path.
   */
  auxiliaryPathMinAngle: number;
  /**
   * Does this cavern have monsters in it?
   */
  hasMonsters: boolean;
  /**
   * How blobby and jagged caves should be.
   * 0 results in perfect squashed octagons.
   * Larger values can result in oversized spaces or extremely jagged caves.
   */
  caveBaroqueness: number;
  /**
   * How blobby and jagged halls should be.
   * 0 results in perfect squashed octagons.
   * Larger values can result in oversized spaces or extremely jagged caves.
   */
  hallBaroqueness: number;

  caveCrystalRichness: Curve;
  hallCrystalRichness: Curve;
  caveOreRichness: Curve;
  hallOreRichness: Curve;

  caveHasRechargeSeamChance: number;
  hallHasRechargeSeamChance: number;
};

enum Die {
  biome = 0,
  targetSize,
  hasMonsters,
}

export function inferContextDefaults(
  dice: DiceBox,
  args: Partial<Omit<CavernContext, "seed">>,
): CavernContext {
  const r: typeof args & Pick<CavernContext, "biome" | 'targetSize'> = {
    biome: dice.init(Die.biome).uniformChoice(['rock', 'ice', 'lava']),
    targetSize: 64 ?? dice.init(Die.targetSize).uniformInt({min: 50, max: 80}),
    ...args
  }
  return {
    logger: args.logger ?? ({} as Logger),
    seed: dice.seed,
    baseplateMaxOblongness: 3,
    baseplateMaxRatioOfSize: 0.33,
    caveCount: 20,
    auxiliaryPathCount: 4,
    auxiliaryPathMinAngle: Math.PI / 4,
    hasMonsters: dice.init(Die.hasMonsters).chance(0.75),
    caveBaroqueness: 0.12,
    hallBaroqueness: 0.05,
    caveCrystalRichness: {base: 0.5, hops: 1.0, order: 1.0},
    hallCrystalRichness: {base: 0, hops: 0, order: 0},
    caveOreRichness: {base: 3.75, hops: -0.5, order: -0.25},
    hallOreRichness: {base: 0, hops: 0, order: 0},
    caveHasRechargeSeamChance: {rock: 0.07, ice: 0.07, lava: 0.10}[r.biome],
    hallHasRechargeSeamChance: {rock: 0.02, ice: 0.07, lava: 0.04}[r.biome],
    ...r
  };
}
