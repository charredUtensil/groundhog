import { Logger } from "./logger";
import { DiceBox } from "./prng";

export type Biome = "rock" | "ice" | "lava";
export type Curve = {
  readonly base: number;
  readonly hops: number;
  readonly order: number;
};
function curve(base: number, hops: number, order: number): Curve {
  return { base, hops, order };
}
export type CavernContext = {
  logger: Logger;
  seed: number;
  /**
   * Which biome this map is in.
   */
  biome: Biome;

  /**
   * The "target" final size for the cavern.
   * The final size may be larger or smaller due to randomness;
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
};

export function inferContextDefaults(
  dice: DiceBox,
  args: Partial<Omit<CavernContext, "seed">>,
): CavernContext {
  return {
    logger: args.logger ?? ({} as Logger),
    seed: dice.seed,
    biome: "rock",
    targetSize: 64,
    baseplateMaxOblongness: 3,
    baseplateMaxRatioOfSize: 0.33,
    caveCount: 20,
    auxiliaryPathCount: 4,
    auxiliaryPathMinAngle: Math.PI / 4,
    caveBaroqueness: 0.12,
    hallBaroqueness: 0.05,
    caveCrystalRichness: curve(0.5, 1.0, 1.0),
    hallCrystalRichness: curve(0, 0, 0),
    caveOreRichness: curve(3.75, -0.50, -0.25),
    hallOreRichness: curve(0, 0, 0),
  };
}
