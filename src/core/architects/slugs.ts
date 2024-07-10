import { Architect } from "../models/architect";
import { Tile } from "../models/tiles";
import {
  PartialArchitect,
  DefaultCaveArchitect,
  DefaultHallArchitect,
} from "./default";
import { slugSpawnScript } from "./utils/creature_spawners";
import { sprinkleSlugHoles } from "./utils/creatures";
import { intersectsOnly } from "./utils/intersects";
import { Rough, RoughOyster, weightedSprinkle } from "./utils/oyster";
import { getTotalCrystals, sprinkleCrystals } from "./utils/resources";

const getSlugHoles = (
  args: Parameters<Architect<unknown>["slugSpawnScript"]>[0],
) =>
  args.plan.innerPearl.flatMap((layer) =>
    layer.filter((pos) => args.cavern.tiles.get(...pos) === Tile.SLUG_HOLE),
  );

const SLUG_NEST: PartialArchitect<unknown> = {
  ...DefaultCaveArchitect,
  isSlugNest: true,
  placeCrystals(args) {
    sprinkleCrystals(args, {
      seamBias: Math.max(args.cavern.context.caveCrystalSeamBias, 0.5),
    });
  },
  placeSlugHoles(args) {
    const count = args.cavern.dice
      .placeSlugHoles(args.plan.id)
      .betaInt({ a: 2, b: 2, min: 4, max: 8 });
    sprinkleSlugHoles(args, { count });
  },
  slugSpawnScript: (args) => {
    const holeCount = getSlugHoles(args).length;
    return slugSpawnScript(args, {
      initialCooldown: { min: 20, max: 60 },
      maxTriggerCount: 1,
      needCrystals: { base: Math.floor(getTotalCrystals(args.cavern) / 10) },
      triggerOnFirstArmed: true,
      waveSize: holeCount,
    });
  },
};

const SLUG_HALL: PartialArchitect<unknown> = {
  ...DefaultHallArchitect,
  crystalsToPlace: ({ plan }) =>
    Math.max(plan.crystalRichness * plan.perimeter, 5),
  placeCrystals(args) {
    sprinkleCrystals(args, {
      seamBias: Math.max(args.cavern.context.hallCrystalSeamBias, 0.75),
    });
  },
  placeSlugHoles(args) {
    const count = args.cavern.dice
      .placeSlugHoles(args.plan.id)
      .betaInt({ a: 2, b: 2, min: 1, max: 3 });
    const placements = args.plan.innerPearl.flatMap((layer) =>
      layer.filter(
        (pos) =>
          args.tiles.get(...pos) === Tile.FLOOR &&
          !args.cavern.pearlInnerDex
            .get(...pos)
            ?.some((_, i) => i !== args.plan.id),
      ),
    );
    sprinkleSlugHoles(args, { count, placements });
  },
  slugSpawnScript: (args) => {
    const holes = getSlugHoles(args);
    return slugSpawnScript(args, {
      emerges: holes.map(([x, y]) => ({ x, y, radius: 1 })),
      initialCooldown: { min: 60, max: 120 },
      needCrystals: {
        base: args.plan.crystals * 2,
        increment: args.plan.crystals,
      },
      triggerPoints: holes,
      waveSize: holes.length,
    });
  },
};

const SLUGS: readonly Architect<unknown>[] = [
  {
    name: "Slug Nest",
    ...SLUG_NEST,
    ...new RoughOyster(
      { of: Rough.FLOOR, width: 3, grow: 1 },
      { of: Rough.AT_MOST_DIRT, width: 0, grow: 0.5 },
      {
        of: weightedSprinkle(
          { item: Rough.DIRT, bid: 0.25 },
          { item: Rough.LOOSE_ROCK, bid: 1 },
        ),
        grow: 1,
      },
      { of: Rough.LOOSE_OR_HARD_ROCK, grow: 0.25 },
    ),
    caveBid: ({ cavern, plans, plan }) =>
      cavern.context.hasSlugs &&
      plan.pearlRadius >= 5 &&
      plan.path.baseplates.length === 1 &&
      !plan.fluid &&
      !plan.hasErosion &&
      intersectsOnly(plans, plan, null) &&
      !plans.some((p) => p.architect?.isSlugNest) &&
      0.25,
  },
  {
    name: "Slug Hall",
    ...SLUG_HALL,
    ...new RoughOyster(
      { of: Rough.FLOOR },
      {
        of: weightedSprinkle(
          { item: Rough.LOOSE_OR_HARD_ROCK, bid: 1 },
          { item: Rough.HARD_ROCK, bid: 2 },
        ),
      },
      { of: Rough.VOID, grow: 1 },
    ),
    hallBid: ({ cavern, plan }) =>
      cavern.context.hasSlugs &&
      plan.path.exclusiveSnakeDistance > 5 &&
      !plan.fluid &&
      !plan.hasErosion &&
      1,
  },
];
export default SLUGS;