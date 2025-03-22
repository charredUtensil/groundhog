import { Architect } from "../models/architect";
import { DefaultCaveArchitect, PartialArchitect } from "./default";
import { mkRough, Rough, roughReplace, weightedSprinkle } from "./utils/rough";
import { intersectsOnly } from "./utils/intersects";
import { monsterSpawnScript } from "./utils/creature_spawners";
import { Tile } from "../models/tiles";

const BASE: PartialArchitect<undefined> = {
  ...DefaultCaveArchitect,
  monsterSpawnScript: (args) => monsterSpawnScript(args),
};

const SIMPLE_CAVE = [
  {
    name: "SimpleCave.Filled",
    ...BASE,
    ...mkRough(
      { of: Rough.DIRT, width: 0, grow: 0.25 },
      {
        of: weightedSprinkle(
          { item: Rough.DIRT, bid: 0.25 },
          { item: Rough.LOOSE_ROCK, bid: 0.25 },
          { item: Rough.DIRT_OR_LOOSE_ROCK, bid: 0.5 },
        ),
        grow: 1,
      },
      { of: Rough.LOOSE_OR_HARD_ROCK },
    ),
    caveBid: ({ plan }) => !plan.fluid && plan.pearlRadius < 4 && 0.04,
  },
  {
    name: "SimpleCave.Open",
    ...BASE,
    ...mkRough(
      { of: Rough.FLOOR, grow: 2 },
      { of: Rough.AT_MOST_DIRT, width: 0, grow: 0.5 },
      {
        of: weightedSprinkle(
          { item: Rough.AT_MOST_DIRT, bid: 0.25 },
          { item: Rough.AT_MOST_LOOSE_ROCK, bid: 1 },
        ),
        grow: 1,
      },
      { of: Rough.MIX_FRINGE },
      { of: Rough.VOID, width: 0, grow: 0.5 },
    ),
    caveBid: ({ plans, plan }) =>
      !plan.fluid &&
      plan.pearlRadius < 10 &&
      intersectsOnly(plans, plan, null) &&
      2,
  },
  {
    name: "SimpleCave.Empty",
    ...BASE,
    ...mkRough(
      { of: Rough.FLOOR, grow: 2 },
      { of: Rough.DIRT, width: 0, grow: 0.1 },
      {
        of: weightedSprinkle(
          { item: Rough.DIRT, bid: 0.25 },
          { item: Rough.LOOSE_ROCK, bid: 1 },
        ),
        grow: 1,
      },
      { of: Rough.MIX_LOOSE_HARD_ROCK, grow: 0.5 },
      { of: Rough.VOID, width: 0, grow: 0.5 },
    ),
    caveBid: ({ plan }) => !plan.fluid && plan.pearlRadius < 10 && 1,
  },
  {
    name: "SimpleCave.FilledWithPaths",
    ...BASE,
    ...mkRough(
      { of: Rough.FLOOR, width: 0, grow: 0.5 },
      {
        of: roughReplace({
          dirt: Tile.FLOOR,
          looseRock: Tile.FLOOR,
          hardRock: Tile.FLOOR,
          solidRock: Tile.LOOSE_ROCK,
        }),
        grow: 0.5,
      },
      {
        of: roughReplace({
          dirt: Tile.FLOOR,
          looseRock: Tile.FLOOR,
          hardRock: Tile.FLOOR,
          solidRock: Tile.DIRT,
        }),
        grow: 1,
      },
      { of: Rough.AT_MOST_LOOSE_ROCK },
      { of: Rough.AT_MOST_HARD_ROCK },
      { of: Rough.VOID, width: 0, grow: 0.5 },
    ),
    caveBid: ({ plans, plan }) =>
      !plan.fluid &&
      plan.pearlRadius > 4 &&
      plan.path.baseplates.length === 1 &&
      plans.some((p) => plan.intersects[p.id] && p.fluid) &&
      1,
  },
  {
    name: "SimpleCave.Doughnut",
    ...BASE,
    ...mkRough(
      { of: Rough.ALWAYS_SOLID_ROCK, grow: 0.2 },
      { of: Rough.ALWAYS_HARD_ROCK, grow: 0.3 },
      { of: Rough.LOOSE_ROCK, width: 0, grow: 0.5 },
      { of: Rough.FLOOR, width: 2, grow: 1 },
      { of: Rough.DIRT, width: 0, grow: 0.5 },
      { of: Rough.LOOSE_ROCK },
      { of: Rough.AT_MOST_HARD_ROCK },
    ),
    caveBid: ({ plan }) => !plan.fluid && plan.pearlRadius > 5 && 0.5,
  },
  {
    name: "SimpleCave.Stalagmites",
    ...BASE,
    ...mkRough(
      {
        of: weightedSprinkle(
          { item: Rough.ALWAYS_DIRT, bid: 0.01 },
          { item: Rough.ALWAYS_LOOSE_ROCK, bid: 0.04 },
          { item: Rough.FLOOR, bid: 1 },
        ),
        width: 4,
        grow: 3,
      },
      { of: Rough.MIX_DIRT_LOOSE_ROCK, grow: 1 },
      { of: Rough.MIX_LOOSE_HARD_ROCK, grow: 0.25 },
    ),
    caveBid: ({ plan }) => !plan.fluid && plan.pearlRadius > 5 && 0.2,
  },
] as const satisfies readonly Architect<undefined>[];
export default SIMPLE_CAVE;
