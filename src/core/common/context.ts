import { Logger } from "./logger";
import { DiceBox } from "./prng";

export type Biome = "rock" | "ice" | "lava";
export type Curve = {
  readonly base: number;
  readonly hops: number;
  readonly completion: number;
};
export type CavernContext = {
  dice: DiceBox;
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
};

export function inferContextDefaults(
  args: Partial<CavernContext>,
): CavernContext {
  const seed = args.seed ?? 0x19930202;
  return {
    dice: new DiceBox(seed),
    logger: args.logger ?? ({} as Logger),
    seed: seed,
    biome: "rock",
    targetSize: 64,
    baseplateMaxOblongness: 3,
    baseplateMaxRatioOfSize: 0.33,
    caveCount: 20,
  };
}
