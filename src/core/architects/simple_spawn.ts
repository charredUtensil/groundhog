import { Architect } from "../models/architect";
import { DefaultSpawnArchitect, PartialArchitect } from "./default";
import { mkRough, Rough } from "./utils/rough";
import { sprinkleSlugHoles } from "./utils/creatures";
import { monsterSpawnScript, slugSpawnScript } from "./utils/creature_spawners";

const BASE: PartialArchitect<undefined> = {
  ...DefaultSpawnArchitect,
  placeSlugHoles: (args) => {
    const count = args.cavern.context.hasSlugs
      ? args.cavern.dice
          .placeSlugHoles(args.plan.id)
          .betaInt({ a: 1.5, b: 2, min: 1, max: 4 })
      : undefined;
    sprinkleSlugHoles(args, { count });
  },
  monsterSpawnScript: (args) =>
    monsterSpawnScript(args, {
      initialCooldown: { min: 120, max: 240 },
      needCrystals: { base: 4 },
      needStableAir: true,
    }),
  slugSpawnScript: (args) =>
    slugSpawnScript(args, {
      initialCooldown: { min: 120, max: 240 },
      needCrystals: { base: 5, increment: 4 },
      spawnRate: 0.2,
      waveSize: 1,
    }),
};

const OPEN = mkRough(
  { of: Rough.ALWAYS_FLOOR, width: 2, grow: 2 },
  { of: Rough.AT_MOST_LOOSE_ROCK, grow: 1 },
  { of: Rough.MIX_FRINGE },
);

const SIMPLE_SPAWN = [
  {
    name: "SimpleSpawn.Open",
    ...BASE,
    ...OPEN,
    anchorBid: ({ plan }) =>
      !plan.fluid && plan.lakeSize >= 3 && plan.pearlRadius > 0 && 1,
  },
  {
    name: "SimpleSpawn.Empty",
    ...BASE,
    ...mkRough(
      { of: Rough.ALWAYS_FLOOR, width: 2, grow: 2 },
      { of: Rough.LOOSE_ROCK, grow: 1 },
      { of: Rough.MIX_FRINGE },
    ),
    anchorBid: ({ plan }) =>
      !plan.fluid && plan.lakeSize >= 3 && plan.pearlRadius > 0 && 1,
  },
  {
    // This is mostly a fallback in case there's no other viable cave.
    // 9 crystals should be enough to ensure an escape route.
    name: "SimpleSpawn.Fallback",
    ...BASE,
    ...OPEN,
    crystalsToPlace: () => 9,
    anchorBid: ({ plan }) => !plan.fluid && plan.pearlRadius >= 2 && 0.0001,
  },
] as const satisfies readonly Architect<undefined>[];
export default SIMPLE_SPAWN;
