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

  hasOverrides: boolean;
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
   * How many plans to flood with water.
   */
  waterPlans: number;
  /**
   * How many plans to flood with lava.
   */
  lavaPlans: number;
  /**
   * How many contiguous "lakes" to generate
   */
  waterLakes: number;
  /**
   * How many contiguous lava "lakes" to generate
   */
  lavaLakes: number;
  /**
   * How many plans will have erosion?
   */
  erosionPlans: number;
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

  /** How many monsters to spawn per minute in a cave, if monsters are enabled. */
  monsterSpawnRate: Curve;
  /** How many monsters to spawn at a time in a cave, if monsters are enabled. */
  monsterWaveSize: Curve;
  /**
   * The chance each cave will have a recharge seam. Some caves (such as spawn)
   * will always have a recharge seam.
   */
  caveHasRechargeSeamChance: number;
  /** The chance each hall will have a recharge seam. */
  hallHasRechargeSeamChance: number;
  /** The chance each cave will have landslides at all. */
  caveHasLandslidesChance: number;
  /** The chance each hall will have landslides at all. */
  hallHasLandslidesChance: number;
  /** The range of cooldowns to use in caves that have landslides. */
  caveLandslideCooldownRange: { min: number; max: number };
  /** The range of cooldowns to use in halls that have landslides. */
  hallLandslideCooldownRange: { min: number; max: number };
  /**
   * Approximately what portion of all the Energy Crystals available in the level
   * should be used as the goal, if there is a crystal goal?
   * Most levels in Lego Rock Raiders tend to use about 20%.
   */
  crystalGoalRatio: number;
};

enum Die {
  biome = 0,
  targetSize,
  hasMonsters,
  flood,
}

function getDefaultFlooding(dice: DiceBox, biome: Biome) {
  const rng = dice.init(Die.flood);
  const waterPlans = rng.betaInt({
    a: 1.4,
    b: 1.4,
    ...{
      rock: { min: 0, max: 8 },
      ice: { min: 0, max: 20 },
      lava: { min: 0, max: 4 },
    }[biome],
  });
  const waterLakes =
    waterPlans > 3 ? rng.uniformInt({ min: 1, max: waterPlans / 2 }) : 1;
  const lavaPlans = rng.betaInt({
    a: 1.4,
    b: 1.4,
    ...{
      rock: { min: 0, max: 4 },
      ice: { min: 0, max: 2 },
      lava: { min: 4, max: 16 },
    }[biome],
  });
  const lavaLakes =
    lavaPlans > 3
      ? rng.uniformInt({ min: 1, max: Math.min(lavaPlans / 2, 3) })
      : 1;
  const erosionPlans =
    lavaPlans > 0
      ? rng.betaInt(
          {
            rock: { a: 0.8, b: 1.4, min: 0, max: 6 },
            ice: { a: 0.5, b: 1.8, min: 0, max: 4 },
            lava: { a: 1.4, b: 1.4, min: 0, max: 16 },
          }[biome],
        )
      : 0;
  return { waterPlans, waterLakes, lavaPlans, lavaLakes, erosionPlans };
}

export function inferContextDefaults(
  dice: DiceBox,
  args: Partial<Omit<CavernContext, "seed" | "hasOverrides">>,
): CavernContext {
  const r = {
    biome: dice
      .init(Die.biome)
      .uniformChoice(["rock", "ice", "lava"] as Biome[]),
    targetSize: dice.init(Die.targetSize).uniformInt({ min: 50, max: 80 }),
    caveCount: 20,
    auxiliaryPathCount: 4,
    ...args,
  };
  return {
    logger: args.logger ?? ({} as Logger),
    seed: dice.seed,
    baseplateMaxOblongness: 3,
    baseplateMaxRatioOfSize: 0.33,
    auxiliaryPathMinAngle: Math.PI / 4,
    hasMonsters: dice.init(Die.hasMonsters).chance(0.75),
    caveBaroqueness: 0.12,
    hallBaroqueness: 0.05,
    caveCrystalRichness: { base: 0.16, hops: 0.32, order: 0.32 },
    hallCrystalRichness: { base: 0, hops: 0, order: 0 },
    caveOreRichness: { base: 1.19, hops: -0.16, order: -0.08 },
    hallOreRichness: { base: 0, hops: 0, order: 0 },
    monsterSpawnRate: { base: 0.3, hops: 0.56, order: 0.6 },
    monsterWaveSize: { base: 1.75, hops: 2.0, order: 3.0 },
    caveHasRechargeSeamChance: { rock: 0.07, ice: 0.07, lava: 0.1 }[r.biome],
    hallHasRechargeSeamChance: { rock: 0.02, ice: 0.07, lava: 0.04 }[r.biome],
    caveHasLandslidesChance: 0.4,
    hallHasLandslidesChance: 0.8,
    caveLandslideCooldownRange: { min: 15, max: 300 },
    hallLandslideCooldownRange: { min: 30, max: 300 },
    crystalGoalRatio: 0.2,
    ...getDefaultFlooding(dice, r.biome),
    ...r,
    hasOverrides: Object.keys(args).length > 0,
  };
}
