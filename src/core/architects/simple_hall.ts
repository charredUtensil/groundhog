import { Architect } from "../models/architect";
import { Tile } from "../models/tiles";
import { DefaultHallArchitect, PartialArchitect } from "./default";
import { mkRough, Rough, weightedSprinkle } from "./utils/rough";
import { intersectsOnly } from "./utils/intersects";
import { sprinkleCrystals } from "./utils/resources";
import { placeSleepingMonsters } from "./utils/creatures";

const BASE: PartialArchitect<undefined> = {
  ...DefaultHallArchitect,
};

const SIMPLE_HALL = [
  {
    name: "SimpleHall.Open",
    ...BASE,
    ...mkRough(
      { of: Rough.FLOOR, grow: 2 },
      { of: Rough.AT_MOST_LOOSE_ROCK, grow: 1 },
      { of: Rough.AT_MOST_HARD_ROCK },
      { of: Rough.VOID, grow: 1 },
    ),
    hallBid: ({ plans, plan, hops }) =>
      !plan.fluid &&
      plan.pearlRadius > 0 &&
      (hops.length < 3 && plans[hops[0]].metadata?.tag === "nomads" ? 5 : 1),
  },
  {
    name: "SimpleHall.WideWithMonsters",
    ...BASE,
    ...mkRough(
      { of: Rough.FLOOR, grow: 1 },
      { of: Rough.AT_MOST_HARD_ROCK },
      { of: Rough.VOID },
    ),
    hallBid: ({ cavern, plan }) =>
      cavern.context.hasMonsters &&
      !plan.fluid &&
      plan.pearlRadius > 3 &&
      plan.path.exclusiveSnakeDistance > 0 &&
      0.5,
    placeEntities(args) {
      const rng = args.cavern.dice.placeEntities(args.plan.id);
      const count = Math.ceil(args.plan.monsterWaveSize / 2);
      return { creatures: placeSleepingMonsters(args, { rng, count }) };
    },
  },
  {
    name: "SimpleHall.Filled",
    ...BASE,
    ...mkRough(
      {
        of: weightedSprinkle(
          { item: Rough.FLOOR, bid: 1 },
          { item: Rough.DIRT, bid: 0.4 },
          { item: Rough.LOOSE_ROCK, bid: 0.1 },
        ),
      },
      { of: Rough.MIX_FRINGE },
      { of: Rough.VOID, grow: 1 },
    ),
    hallBid: ({ plan }) => !plan.fluid && plan.pearlRadius > 0 && 1,
  },
  {
    name: "SimpleHall.Water.River",
    ...BASE,
    crystalsToPlace: ({ plan }) => 3 * plan.crystalRichness * plan.perimeter,
    ...mkRough(
      { of: Rough.WATER, width: 2, grow: 1 },
      {
        of: weightedSprinkle(
          { item: Rough.AT_MOST_HARD_ROCK, bid: 1 },
          { item: Rough.VOID, bid: 0.5 },
        ),
      },
      { of: Rough.VOID, grow: 1 },
    ),
    placeCrystals(args) {
      sprinkleCrystals(args, {
        seamBias: Math.max(args.cavern.context.hallCrystalSeamBias, 0.75),
      });
    },
    hallBid: ({ plan }) => plan.fluid === Tile.WATER && 1,
  },
  {
    name: "SimpleHall.Water.Stream",
    ...BASE,
    ...mkRough(
      { of: Rough.WATER, grow: 0.5 },
      { of: Rough.FLOOR, grow: 0.25, shrink: 1 },
      { of: Rough.DIRT_OR_LOOSE_ROCK, grow: 1 },
      { of: Rough.AT_MOST_HARD_ROCK, shrink: 1 },
    ),
    hallBid: ({ plans, plan }) =>
      plan.fluid === Tile.WATER && intersectsOnly(plans, plan, Tile.WATER) && 1,
  },
  {
    name: "SimpleHall.Lava.River",
    ...BASE,
    ...mkRough(
      { of: Rough.LAVA, width: 2, grow: 1 },
      { of: Rough.AT_MOST_HARD_ROCK, width: 0, grow: 1 },
      { of: Rough.VOID, grow: 1 },
    ),
    hallBid: ({ plan }) => plan.fluid === Tile.LAVA && 1,
  },
  {
    name: "SimpleHall.Lava.WideWithMonsters",
    ...BASE,
    ...mkRough(
      { of: Rough.LAVA, width: 2, grow: 1 },
      { of: Rough.AT_MOST_HARD_ROCK },
      { of: Rough.VOID },
    ),
    hallBid: ({ cavern, plan }) =>
      cavern.context.hasMonsters &&
      cavern.context.biome === "lava" &&
      plan.fluid === Tile.LAVA &&
      plan.pearlRadius > 3 &&
      plan.path.exclusiveSnakeDistance > 0 &&
      1,
    placeEntities(args) {
      const rng = args.cavern.dice.placeEntities(args.plan.id);
      const count = Math.ceil(args.plan.monsterWaveSize / 2);
      return { creatures: placeSleepingMonsters(args, { rng, count }) };
    },
  },
] as const satisfies readonly Architect<undefined>[];
export default SIMPLE_HALL;
