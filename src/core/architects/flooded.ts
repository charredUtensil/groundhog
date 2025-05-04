import { Architect } from "../models/architect";
import { Tile } from "../models/tiles";
import { DefaultCaveArchitect, PartialArchitect } from "./default";
import { mkRough, Rough, weightedSprinkle } from "./utils/rough";
import { intersectsOnly, isDeadEnd } from "./utils/intersects";
import { monsterSpawnScript } from "./utils/creature_spawners";
import { sprinkleCrystals } from "./utils/resources";
import { placeSleepingMonsters } from "./utils/creatures";

const BASE: PartialArchitect<undefined> = {
  ...DefaultCaveArchitect,
  placeSlugHoles() {},
  monsterSpawnScript(args) {
    if (args.cavern.context.biome === "ice" && args.plan.fluid === Tile.LAVA) {
      return;
    }
    if (args.cavern.context.biome === "lava" && args.plan.fluid !== Tile.LAVA) {
      return;
    }
    return monsterSpawnScript(args);
  },
};

const FLOODED = [
  {
    name: "Flooded.Water.Lake",
    ...BASE,
    ...mkRough(
      { of: Rough.WATER, grow: 2 },
      { of: Rough.FLOOR, shrink: 1, grow: 1 },
      { of: Rough.LOOSE_ROCK },
      {
        of: weightedSprinkle(
          { item: Rough.LOOSE_ROCK, bid: 10 },
          { item: Rough.LOOSE_OR_HARD_ROCK, bid: 1 },
        ),
      },
    ),
    caveBid: ({ plan }) =>
      plan.fluid === Tile.WATER && plan.pearlRadius < 10 && 1,
  },
  {
    name: "Flooded.Water.LakeWithMonsters",
    ...BASE,
    ...mkRough(
      { of: Rough.WATER, grow: 2 },
      { of: Rough.FLOOR, grow: 1 },
      { of: Rough.LOOSE_ROCK },
      { of: Rough.LOOSE_OR_HARD_ROCK },
    ),
    caveBid: ({ cavern, plan }) =>
      cavern.context.hasMonsters &&
      cavern.context.biome === "ice" &&
      plan.fluid === Tile.WATER &&
      plan.path.baseplates.length > 1 &&
      plan.pearlRadius > 3 &&
      plan.pearlRadius < 10 &&
      1,
    placeEntities(args) {
      const rng = args.cavern.dice.placeEntities(args.plan.id);
      const count = Math.ceil(args.plan.monsterWaveSize * 1.2);
      return { creatures: placeSleepingMonsters(args, { rng, count }) };
    },
  },
  {
    name: "Flooded.Water.Island",
    ...BASE,
    ...mkRough(
      { of: Rough.ALWAYS_SOLID_ROCK, width: 0, grow: 0.7 },
      { of: Rough.ALWAYS_HARD_ROCK, width: 0, grow: 0.2 },
      { of: Rough.ALWAYS_LOOSE_ROCK, width: 0, grow: 0.2 },
      { of: Rough.ALWAYS_DIRT, grow: 0.5 },
      { of: Rough.ALWAYS_FLOOR, grow: 0.1 },
      { of: Rough.WATER, grow: 2 },
      { of: Rough.FLOOR, grow: 1 },
      { of: Rough.LOOSE_ROCK },
      { of: Rough.MIX_FRINGE },
    ),
    caveBid: ({ plan }) =>
      plan.fluid === Tile.WATER && plan.pearlRadius > 5 && 2,
  },
  {
    name: "Flooded.Lava.Lake",
    ...BASE,
    ...mkRough(
      { of: Rough.LAVA, grow: 2 },
      { of: Rough.FLOOR, grow: 1 },
      { of: Rough.LOOSE_ROCK, shrink: 1 },
      { of: Rough.LOOSE_OR_HARD_ROCK },
    ),
    caveBid: ({ plan }) =>
      plan.fluid === Tile.LAVA && plan.pearlRadius < 10 && 1,
  },
  {
    name: "Flooded.Lava.Island",
    ...BASE,
    ...mkRough(
      { of: Rough.ALWAYS_SOLID_ROCK, width: 0, grow: 0.7 },
      { of: Rough.ALWAYS_HARD_ROCK, width: 0, grow: 0.2 },
      { of: Rough.ALWAYS_LOOSE_ROCK, width: 0, grow: 0.2 },
      { of: Rough.ALWAYS_FLOOR, width: 2, grow: 0.1 },
      { of: Rough.LAVA, grow: 2 },
      { of: Rough.FLOOR, grow: 0.5 },
      { of: Rough.LOOSE_ROCK },
      { of: Rough.LOOSE_OR_HARD_ROCK },
    ),
    caveBid: ({ plan }) =>
      plan.fluid === Tile.LAVA && plan.pearlRadius > 5 && 1,
  },
  {
    name: "Flooded.Water.Peninsula",
    ...BASE,
    ...mkRough(
      { of: Rough.ALWAYS_SOLID_ROCK, width: 0, grow: 0.7 },
      { of: Rough.ALWAYS_HARD_ROCK, width: 0, grow: 0.2 },
      { of: Rough.ALWAYS_LOOSE_ROCK, width: 0, grow: 0.2 },
      { of: Rough.ALWAYS_DIRT, width: 0, grow: 0.5 },
      { of: Rough.ALWAYS_FLOOR, width: 2, grow: 0.1 },
      { of: Rough.BRIDGE_ON_WATER, grow: 2 },
      { of: Rough.LOOSE_ROCK },
      { of: Rough.MIX_FRINGE },
    ),
    caveBid: ({ plans, plan }) =>
      plan.fluid === Tile.WATER &&
      plan.pearlRadius > 5 &&
      isDeadEnd(plan) &&
      intersectsOnly(plans, plan, null) &&
      1,
  },
  {
    name: "Flooded.Lava.Peninsula",
    ...BASE,
    ...mkRough(
      { of: Rough.ALWAYS_SOLID_ROCK, width: 0, grow: 0.7 },
      { of: Rough.ALWAYS_HARD_ROCK, width: 0, grow: 0.2 },
      { of: Rough.ALWAYS_LOOSE_ROCK, grow: 0.2 },
      { of: Rough.ALWAYS_FLOOR, grow: 0.1 },
      { of: Rough.BRIDGE_ON_LAVA, grow: 2 },
      { of: Rough.AT_MOST_HARD_ROCK },
    ),
    caveBid: ({ plans, plan }) =>
      plan.fluid === Tile.LAVA &&
      plan.pearlRadius > 5 &&
      isDeadEnd(plan) &&
      intersectsOnly(plans, plan, null) &&
      1,
  },
  {
    name: "Flooded.Lava.Stalagmites",
    ...BASE,
    crystalsToPlace: ({ plan }) => plan.crystalRichness * plan.perimeter * 2,
    ...mkRough(
      {
        of: weightedSprinkle(
          { item: Rough.ALWAYS_DIRT, bid: 0.01 },
          { item: Rough.ALWAYS_LOOSE_ROCK, bid: 0.1 },
          { item: Rough.LAVA, bid: 1 },
        ),
        width: 4,
        grow: 1,
      },
      {
        of: weightedSprinkle(
          { item: Rough.AT_MOST_DIRT, bid: 0.25 },
          { item: Rough.AT_MOST_LOOSE_ROCK, bid: 1 },
        ),
      },
      { of: Rough.AT_MOST_HARD_ROCK },
    ),
    placeCrystals(args) {
      sprinkleCrystals(args, {
        seamBias: Math.max(args.cavern.context.caveCrystalSeamBias, 0.6),
      });
    },
    caveBid: ({ plan }) =>
      plan.fluid === Tile.LAVA &&
      plan.hasErosion &&
      plan.pearlRadius > 5 &&
      0.4,
  },
] as const satisfies readonly Architect<undefined>[];
export default FLOODED;
