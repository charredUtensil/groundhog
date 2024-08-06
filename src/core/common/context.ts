import { DiceBox } from "./prng";

export type Biome = "rock" | "ice" | "lava";

/**
 * Some values are "curved" so they change based on distance from spawn.
 * These values can be negative to decrease a value away from spawn.
 */
export type Curve = {
  /** The base value at spawn. */
  readonly base: number;
  /**
   * This value is multiplied by a number from 0 to 1 depending on the ratio
   * of the maximum possible distance away from spawn.
   */
  readonly hops: number;
  /**
   * This value is multiplied by a number from 0 to 1 depending on the order
   * the caves / halls are visited in.
   */
  readonly order: number;
};

export type CavernContext = {
  /** The root seed for the dice box. */
  seed: number;

  /** Any values not infered directly from the seed. */
  overrides: readonly string[];
  /**
   * Which biome this map is in. Biome affects the default setting for some
   * other context values, such as how much water or lava a map has.
   */
  biome: Biome;

  /**
   * The "target" final size for the cavern.
   * The final size may be larger or smaller due to random fluctuations -
   * larger caverns will not be explicitly cropped to fit this value.
   */
  targetSize: number;
  /**
   * The maximum aspect ratio baseplates can have.
   */
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
   * Add at most this many extra redundant paths.
   */
  optimalAuxiliaryPathCount: number;
  /**
   * Add at most this many extra redundant paths.
   */
  randomAuxiliaryPathCount: number;
  /**
   * Auxiliary paths will not be chosen if they make an angle less than this
   * against another path.
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
   * How many contiguous water "lakes" to generate.
   */
  waterLakes: number;
  /**
   * How many contiguous lava "lakes" to generate.
   */
  lavaLakes: number;
  /**
   * How many plans will have erosion? Note that lava-flooded plans do not
   * necessarily have erosion, so this number has some overlap with that.
   */
  erosionPlans: number;
  /**
   * Does this cavern have monsters in it?
   */
  hasMonsters: boolean;
  /**
   * Does this cavern have slugs in it?
   */
  hasSlugs: boolean;
  /**
   * Does this cavern have limited air?
   */
  hasAirLimit: boolean;
  /**
   * How blobby and jagged caves should be.
   * 0 results in perfectly squashed octagons.
   * Larger values can result in oversized spaces or extremely jagged caves, up
   * to about 70% where caves start to get simpler and smaller.
   */
  caveBaroqueness: number;
  /**
   * How blobby and jagged halls should be.
   * 0 results in perfect squashed octagons.
   * Larger values can result in oversized spaces or extremely jagged halls, up
   * to about 70% where caves start to get simpler and smaller.
   */
  hallBaroqueness: number;

  /**
   * Curve for determining how many crystals each cave will have.
   * This is roughly measured by crystals per unit of perimeter of the cave.
   */
  caveCrystalRichness: Curve;
  /**
   * Curve for determining how many crystals each hall will have.
   * This is roughly measured by crystals per unit of perimeter of the hall.
   */
  hallCrystalRichness: Curve;
  /**
   * Curve for determining how much additional ore each cave will have.
   * This is roughly measured by ore per unit of perimeter of the cave, and
   * does not include the 4 ore yielded by clearing rubble.
   */
  caveOreRichness: Curve;
  /**
   * Curve for determining how much additional ore each hall will have.
   * This is roughly measured by ore per unit of perimeter of the hall, and
   * does not include the 4 ore yielded by clearing rubble.
   */
  hallOreRichness: Curve;

  /**
   * How many monsters to spawn per minute in a cave, if monsters are enabled.
   */
  monsterSpawnRate: Curve;
  /**
   * How many monsters to spawn at a time in a cave, if monsters are enabled.
   */
  monsterWaveSize: Curve;
  /**
   * Adjusts the likelihood of architects appearing.
   * Architects that are "encouraged" have their chance multiplied by a high
   * number to make them appear wherever they are applicable.
   * Architects that are "discouraged" have a 0 chance of appearing, which may
   * cause a crash if that was the only architect possible for a cave or hall.
   * Note that adjusting this may cause other seemingly unrelated caves to use
   * different architects as the probabilities shift.
   */
  architects: { [key: string]: "encourage" | "disable" };
  /**
   * The chance each cave will have a recharge seam. Some caves (such as spawn)
   * will always have a recharge seam.
   */
  caveHasRechargeSeamChance: number;
  /** The chance each hall will have a recharge seam. */
  hallHasRechargeSeamChance: number;
  /**
   * The chance each crystal placed will immediately place a seam instead,
   * assuming it is possible to do so. When this is set to 0, seams may still
   * appear since any wall with 4 or more crystals will be automatically
   * upgraded to a seam.
   */
  caveCrystalSeamBias: number;
  /**
   * The chance each crystal placed will immediately place a seam instead,
   * assuming it is possible to do so. When this is set to 0, seams may still
   * appear since any wall with 4 or more crystals will be automatically
   * upgraded to a seam.
   */
  hallCrystalSeamBias: number;
  /**
   * The chance each ore placed will immediately place a seam instead,
   * assuming it is possible to do so. When this is set to 0, seams may still
   * appear since any wall with 4 or more ore will be automatically
   * upgraded to a seam.
   */
  caveOreSeamBias: number;
  /**
   * The chance each ore placed will immediately place a seam instead,
   * assuming it is possible to do so. When this is set to 0, seams may still
   * appear since any wall with 4 or more ore will be automatically
   * upgraded to a seam.
   */
  hallOreSeamBias: number;
  /**
   * The chance each normal cave will have a slug hole, regardless of whether
   * Slimy Slugs are enabled in this level.
   */
  caveHasSlugHoleChance: number;
  /**
   * The chance each normal hall will have a slug hole, regardless of whether
   * Slimy Slugs are enabled in this level.
   */
  hallHasSlugHoleChance: number;
  /** The chance each cave will have landslides at all. */
  caveHasLandslidesChance: number;
  /** The chance each hall will have landslides at all. */
  hallHasLandslidesChance: number;
  /** The range of cooldowns to use in caves that have landslides. */
  caveLandslideCooldownRange: { min: number; max: number };
  /** The range of cooldowns to use in halls that have landslides. */
  hallLandslideCooldownRange: { min: number; max: number };
  /**
   * Approximately what portion of all the Energy Crystals available in the
   * level should be used as the goal, if there is a crystal goal.
   * For most Rock Raiders levels, this tends to be about 20%.
   */
  crystalGoalRatio: number;
  /**
   * The heightmap will try to generate caves at a height that is +/- this
   * number. If this is set to 0, height generation will be skipped and the
   * entire map will be flat.
   */
  heightTargetRange: number;
  /**
   * The number of passes to spread cave target heights into the void.
   */
  stratascosity: number;
  /**
   * How closely the strataflux step should adhere to target heights.
   */
  strataplanity: number;
  /**
   * The maximum height difference between two points on the side of any tile
   * that is part of an arbitrary cave. Some tiles (like water) and caves (like
   * those intended to be built in) will be further restricted.
   */
  caveMaxSlope: number;
  /**
   * The maximum height difference between two points on the side of any tile
   * that is part of an arbitrary hall. Some tiles (like water) will be further
   * restricted.
   */
  hallMaxSlope: number;
  /**
   * The maximum height difference between two points on the side of any tile
   * that is outside the playable area - that is, undrillable solid rock.
   */
  voidMaxSlope: number;
  /**
   * The maximum height difference between two points on the side of any tile
   * that is out of play on the border of the map.
   */
  borderMaxSlope: number;
  /**
   * GroundHog attempts to calculate how much air is needed to build a Support
   * Station by playing perfectly through a (rough) simulation of the level.
   * In theory, it should be possible for a very good player to match or beat
   * this simulation - but that's not going to be fun. Multiply the estimate by
   * the safety factor to get the final air number.
   */
  airSafetyFactor: number;
};

enum Die {
  biome = 0,
  targetSize,
  hasMonsters,
  flood,
  heightTargetRange,
  hasSlugs,
  hasAirLimit,
}

const STANDARD_DEFAULTS = {
  baseplateMaxOblongness: 3,
  baseplateMaxRatioOfSize: 0.33,
  caveCount: 20,
  optimalAuxiliaryPathCount: 2,
  randomAuxiliaryPathCount: 3,
  auxiliaryPathMinAngle: Math.PI / 4,
  caveBaroqueness: 0.16,
  hallBaroqueness: 0.07,
  caveCrystalRichness: { base: 0.16, hops: 0.32, order: 0.32 },
  hallCrystalRichness: { base: 0.07, hops: 0, order: 0 },
  caveOreRichness: { base: 1.19, hops: -0.16, order: -0.08 },
  hallOreRichness: { base: 0.12, hops: 0, order: 0 },
  monsterSpawnRate: { base: 0.3, hops: 0.56, order: 0.6 },
  monsterWaveSize: { base: 1.75, hops: 2.0, order: 3.0 },
  architects: {},
  caveCrystalSeamBias: 0.05,
  hallCrystalSeamBias: 0.05,
  caveOreSeamBias: 0.05,
  hallOreSeamBias: 0.05,
  hallHasSlugHoleChance: 0,
  stratascosity: 0,
  strataplanity: 3,
  caveHasLandslidesChance: 0.4,
  hallHasLandslidesChance: 0.8,
  caveLandslideCooldownRange: { min: 15, max: 120 },
  hallLandslideCooldownRange: { min: 30, max: 150 },
  airSafetyFactor: 2,
  crystalGoalRatio: 0.2,
} as const satisfies Partial<CavernContext>;

const DEFAULTS_FOR_BIOME = {
  rock: {
    caveHasRechargeSeamChance: 0.07,
    hallHasRechargeSeamChance: 0.02,
    caveHasSlugHoleChance: 0.05,
    caveMaxSlope: 75,
    hallMaxSlope: 90,
    voidMaxSlope: 120,
    borderMaxSlope: 200,
  },
  ice: {
    caveHasRechargeSeamChance: 0.07,
    hallHasRechargeSeamChance: 0.07,
    caveHasSlugHoleChance: 0,
    caveMaxSlope: 30,
    hallMaxSlope: 30,
    voidMaxSlope: 40,
    borderMaxSlope: 100,
  },
  lava: {
    caveHasRechargeSeamChance: 0.1,
    hallHasRechargeSeamChance: 0.04,
    caveHasSlugHoleChance: 0.01,
    caveMaxSlope: 60,
    hallMaxSlope: 90,
    voidMaxSlope: 120,
    borderMaxSlope: 200,
  },
} as const satisfies { [K in Biome]: Partial<CavernContext> };

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
  args: Partial<Omit<CavernContext, "overrides">> & Pick<CavernContext, "seed">,
): CavernContext {
  const dice = new DiceBox(args.seed);
  const r = {
    biome: dice
      .init(Die.biome)
      .uniformChoice(["rock", "ice", "lava"] as Biome[]),
    hasMonsters: dice.init(Die.hasMonsters).chance(0.75),
    targetSize: dice.init(Die.targetSize).uniformInt({ min: 50, max: 78 }),
    ...args,
  };
  const hasAirLimit = dice.init(Die.hasAirLimit).chance(0.75);
  const hasSlugs = dice.init(Die.hasSlugs).chance(
    {
      rock: 0.25,
      ice: 0.01,
      lava: 0.05,
    }[r.biome],
  );
  const heightTargetRange = dice.init(Die.heightTargetRange).betaInt(
    {
      rock: { a: 3, b: 1, min: 100, max: 500 },
      ice: { a: 1, b: 3, min: 100, max: 500 },
      lava: { a: 2, b: 1.5, min: 100, max: 500 },
    }[r.biome],
  );
  return {
    ...STANDARD_DEFAULTS,
    ...DEFAULTS_FOR_BIOME[r.biome],
    ...getDefaultFlooding(dice, r.biome),
    hasAirLimit,
    hasSlugs,
    heightTargetRange,
    ...r,
    overrides: Object.keys(args)
      .filter((k) => k !== "seed")
      .sort(),
  };
}
