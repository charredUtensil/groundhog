import { DiceBox } from "./prng";

export type Biome = "rock" | "ice" | "lava";

/**
 * Some values are "curved" so they change based on distance from the anchor.
 * These values can be negative to decrease a value away from the anchor.
 */
export type Curve = {
  /** The base value at the anchor. */
  readonly base: number;
  /**
   * This value is multiplied by a number from 0 to 1 depending on the ratio
   * of the maximum possible distance away from the anchor.
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
  readonly seed: number;

  /**
   * Which biome this map is in. Biome affects the default setting for some
   * other context values, such as how much water or lava a map has.
   */
  readonly biome: Biome;

  /**
   * The "target" final size for the cavern.
   * The final size may be larger or smaller due to random fluctuations -
   * larger caverns will not be explicitly cropped to fit this value.
   */
  readonly targetSize: number;
  /**
   * The maximum aspect ratio baseplates can have.
   */
  readonly baseplateMaxOblongness: number;
  /**
   * Baseplates may be at most this ratio of the target size.
   */
  readonly baseplateMaxRatioOfSize: number;
  /**
   * Promote this many baseplates to become caves.
   * The higher this number is, the more "busy" the final map will be.
   */
  readonly caveCount: number;
  /**
   * Add at most this many extra redundant paths.
   */
  readonly optimalAuxiliaryPathCount: number;
  /**
   * Add at most this many extra redundant paths.
   */
  readonly randomAuxiliaryPathCount: number;
  /**
   * Auxiliary paths will not be chosen if they make an angle less than this
   * against another path.
   */
  readonly auxiliaryPathMinAngle: number;
  /**
   * How many plans to flood with water.
   */
  readonly waterPlans: number;
  /**
   * How many plans to flood with lava.
   */
  readonly lavaPlans: number;
  /**
   * How many contiguous water "lakes" to generate.
   */
  readonly waterLakes: number;
  /**
   * How many contiguous lava "lakes" to generate.
   */
  readonly lavaLakes: number;
  /**
   * How many plans will have erosion? Note that lava-flooded plans do not
   * necessarily have erosion, so this number has some overlap with that.
   */
  readonly erosionPlans: number;
  /**
   * Does this cavern have monsters in it?
   */
  readonly hasMonsters: boolean;
  /**
   * Does this cavern have slugs in it?
   */
  readonly hasSlugs: boolean;
  /**
   * Does this cavern have limited air?
   */
  readonly hasAirLimit: boolean;
  /**
   * Bias toward (or against) the anchor being in the center.
   */
  readonly anchorGravity: number;
  readonly anchorWhimsy: number;
  readonly planWhimsy: number;
  /**
   * How blobby and jagged caves should be.
   * 0 results in perfectly squashed octagons.
   * Larger values can result in oversized spaces or extremely jagged caves, up
   * to about 70% where caves start to get simpler and smaller.
   */
  readonly caveBaroqueness: number;
  /**
   * How blobby and jagged halls should be.
   * 0 results in perfect squashed octagons.
   * Larger values can result in oversized spaces or extremely jagged halls, up
   * to about 70% where caves start to get simpler and smaller.
   */
  readonly hallBaroqueness: number;

  /**
   * Curve for determining how many crystals each cave will have.
   * This is roughly measured by crystals per unit of perimeter of the cave.
   */
  readonly caveCrystalRichness: Curve;
  /**
   * Curve for determining how many crystals each hall will have.
   * This is roughly measured by crystals per unit of perimeter of the hall.
   */
  readonly hallCrystalRichness: Curve;
  /**
   * Curve for determining how much additional ore each cave will have.
   * This is roughly measured by ore per unit of perimeter of the cave, and
   * does not include the 4 ore yielded by clearing rubble.
   */
  readonly caveOreRichness: Curve;
  /**
   * Curve for determining how much additional ore each hall will have.
   * This is roughly measured by ore per unit of perimeter of the hall, and
   * does not include the 4 ore yielded by clearing rubble.
   */
  readonly hallOreRichness: Curve;

  /**
   * How many monsters to spawn per minute in a cave, if monsters are enabled.
   */
  readonly monsterSpawnRate: Curve;
  /**
   * How many monsters to spawn at a time in a cave, if monsters are enabled.
   */
  readonly monsterWaveSize: Curve;
  /**
   * Adjusts the likelihood of architects appearing.
   * Architects that are "encouraged" have their chance multiplied by a high
   * number to make them appear wherever they are applicable.
   * Architects that are "discouraged" have a 0 chance of appearing, which may
   * cause a crash if that was the only architect possible for a cave or hall.
   * Note that adjusting this may cause other seemingly unrelated caves to use
   * different architects as the probabilities shift.
   */
  readonly architects: { readonly [key: string]: "encourage" | "disable" };
  /**
   * The chance each cave will have a recharge seam. Some caves (like most
   * spawns) will always have a recharge seam.
   */
  readonly caveHasRechargeSeamChance: number;
  /** The chance each hall will have a recharge seam. */
  readonly hallHasRechargeSeamChance: number;
  /**
   * The chance each crystal placed will immediately place a seam instead,
   * assuming it is possible to do so. When this is set to 0, seams may still
   * appear since any wall with 4 or more crystals will be automatically
   * upgraded to a seam.
   */
  readonly caveCrystalSeamBias: number;
  /**
   * The chance each crystal placed will immediately place a seam instead,
   * assuming it is possible to do so. When this is set to 0, seams may still
   * appear since any wall with 4 or more crystals will be automatically
   * upgraded to a seam.
   */
  readonly hallCrystalSeamBias: number;
  /**
   * The chance each ore placed will immediately place a seam instead,
   * assuming it is possible to do so. When this is set to 0, seams may still
   * appear since any wall with 4 or more ore will be automatically
   * upgraded to a seam.
   */
  readonly caveOreSeamBias: number;
  /**
   * The chance each ore placed will immediately place a seam instead,
   * assuming it is possible to do so. When this is set to 0, seams may still
   * appear since any wall with 4 or more ore will be automatically
   * upgraded to a seam.
   */
  readonly hallOreSeamBias: number;
  /**
   * The chance each normal cave will have a slug hole, regardless of whether
   * Slimy Slugs are enabled in this level.
   */
  readonly caveHasSlugHoleChance: number;
  /**
   * The chance each normal hall will have a slug hole, regardless of whether
   * Slimy Slugs are enabled in this level.
   */
  readonly hallHasSlugHoleChance: number;
  /** The chance each cave will have landslides at all. */
  readonly caveHasLandslidesChance: number;
  /** The chance each hall will have landslides at all. */
  readonly hallHasLandslidesChance: number;
  /** The range of cooldowns to use in caves that have landslides. */
  readonly caveLandslideCooldownRange: {
    readonly min: number;
    readonly max: number;
  };
  /** The range of cooldowns to use in halls that have landslides. */
  readonly hallLandslideCooldownRange: {
    readonly min: number;
    readonly max: number;
  };
  /**
   * Approximately what portion of all the Energy Crystals available in the
   * level should be used as the goal, if there is a crystal goal.
   * For most Rock Raiders levels, this tends to be about 20%.
   */
  readonly crystalGoalRatio: number;
  /**
   * The heightmap will try to generate caves at a height that is +/- this
   * number. If this is set to 0, height generation will be skipped and the
   * entire map will be flat.
   */
  readonly heightTargetRange: number;
  /**
   * The number of passes to spread cave target heights into the void.
   */
  readonly stratascosity: number;
  /**
   * How closely the strataflux step should adhere to target heights.
   */
  readonly strataplanity: number;
  /**
   * The maximum height difference between two points on the side of any tile
   * that is part of an arbitrary cave. Some tiles (like water) and caves (like
   * those intended to be built in) will be further restricted.
   */
  readonly caveMaxSlope: number;
  /**
   * The maximum height difference between two points on the side of any tile
   * that is part of an arbitrary hall. Some tiles (like water) will be further
   * restricted.
   */
  readonly hallMaxSlope: number;
  /**
   * The maximum height difference between two points on the side of any tile
   * that is outside the playable area - that is, undrillable solid rock.
   */
  readonly voidMaxSlope: number;
  /**
   * The maximum height difference between two points on the side of any tile
   * that is out of play on the border of the map.
   */
  readonly borderMaxSlope: number;
  /**
   * GroundHog attempts to calculate how much air is needed to build a Support
   * Station by playing perfectly through a (rough) simulation of the level.
   * In theory, it should be possible for a very good player to match or beat
   * this simulation - but that's not going to be fun. Multiply the estimate by
   * the safety factor to get the final air number.
   */
  readonly airSafetyFactor: number;
  /**
   * When a monster or slug spawn is triggered, wait at least this many seconds
   * before another spawn can be triggered anywhere in the cavern. This is to
   * mitigate instances where a single vehicle speeds through a bunch of
   * caves and sending a wave of like 17 monsters.
   */
  readonly globalHostilesCooldown: number;
  /**
   * Discourage more than this many monsters or slugs from spawning in the
   * level at the same time.
   */
  readonly globalHostilesCap: number;
};

export type PartialCavernContext = Partial<CavernContext> &
  Pick<CavernContext, "seed">;

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
  anchorGravity: 1,
  anchorWhimsy: 1,
  planWhimsy: 1,
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
  crystalGoalRatio: 0.2,
  airSafetyFactor: 2,
  globalHostilesCooldown: 0,
  globalHostilesCap: 15,
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
  args: PartialCavernContext,
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
  };
}
