import { Architect, BaseMetadata } from "../models/architect";
import { Tile } from "../models/tiles";
import {
  PartialArchitect,
  DefaultCaveArchitect,
  DefaultHallArchitect,
} from "./default";
import { slugSpawnScript } from "./utils/creature_spawners";
import { sprinkleSlugHoles } from "./utils/creatures";
import { intersectsOnly } from "./utils/intersects";
import { mkRough, Rough, weightedSprinkle } from "./utils/rough";
import { getTotalCrystals, sprinkleCrystals } from "./utils/resources";
import { getDiscoveryPoint } from "./utils/discovery";
import { DzPriority, mkVars, transformPoint } from "./utils/script";
import { LoreDie } from "../common/prng";
import { FOUND_SLUG_NEST } from "../lore/graphs/events";

const getSlugHoles = (
  args: Parameters<NonNullable<Architect<any>["slugSpawnScript"]>>[0],
) =>
  args.plan.innerPearl.flatMap((layer) =>
    layer.filter((pos) => args.cavern.tiles.get(...pos) === Tile.SLUG_HOLE),
  );

const SLUG_NEST_METADATA = {
  tag: "slugNest",
} as const satisfies BaseMetadata;

const SLUG_NEST: PartialArchitect<typeof SLUG_NEST_METADATA> = {
  ...DefaultCaveArchitect,
  prime: () => SLUG_NEST_METADATA,
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
      reArmMode: "none",
      initialCooldown: { min: 20, max: 60 },
      needCrystals: { base: Math.floor(getTotalCrystals(args.cavern) / 10) },
      tripOnArmed: "first",
      waveSize: holeCount,
    });
  },
  claimEventOnDiscover: ({ cavern, plan }) => {
    const pos = getDiscoveryPoint(cavern, plan);
    return [{ pos, priority: DzPriority.TRIVIAL }];
  },
  script: ({ cavern, plan, sb }) => {
    const discoPoint = getDiscoveryPoint(cavern, plan);
    if (
      !discoPoint ||
      cavern.ownsScriptOnDiscover[
        cavern.discoveryZones.get(...discoPoint)!.id
      ] !== plan.id
    ) {
      return;
    }

    const v = mkVars(`p${plan.id}SgNt`, ["messageDiscover"]);

    sb.declareString(v.messageDiscover, {
      die: LoreDie.foundSlugNest,
      pg: FOUND_SLUG_NEST,
    });
    sb.if(
      `change:${transformPoint(cavern, discoPoint)}`,
      `msg:${v.messageDiscover};`,
      `pan:${transformPoint(cavern, plan.innerPearl[0][0])};`,
    );
  },
};

const SLUG_HALL: PartialArchitect<undefined> = {
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
      tripPoints: holes,
      waveSize: holes.length,
    });
  },
};

const SLUGS = [
  {
    name: "Slugs.Nest",
    ...SLUG_NEST,
    ...mkRough(
      { of: Rough.FLOOR, width: 3, grow: 1 },
      { of: Rough.AT_MOST_DIRT, width: 0, grow: 0.5 },
      {
        of: weightedSprinkle(
          { item: Rough.DIRT, bid: 0.25 },
          { item: Rough.LOOSE_ROCK, bid: 1 },
        ),
        grow: 1,
      },
      { of: Rough.MIX_LOOSE_HARD_ROCK, grow: 0.25 },
    ),
    caveBid: ({ cavern, plans, plan }) =>
      cavern.context.hasSlugs &&
      plan.pearlRadius >= 5 &&
      plan.path.baseplates.length === 1 &&
      !plan.fluid &&
      !plan.hasErosion &&
      intersectsOnly(plans, plan, null) &&
      !plans.some((p) => p.metadata?.tag === "slugNest") &&
      cavern.context.planWhimsy * 0.25,
  },
  {
    name: "Slugs.Hall",
    ...SLUG_HALL,
    ...mkRough(
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
] as const satisfies readonly Architect<any>[];
export default SLUGS;
