import { Architect } from "../models/architect";
import { Tile } from "../models/tiles";
import { DefaultCaveArchitect, PartialArchitect } from "./default";
import { Rough, RoughOyster, weightedSprinkle } from "./utils/oyster";
import { intersectsOnly, isDeadEnd } from "./utils/intersects";
import { getMonsterSpawner } from "./utils/monster_spawner";
import { sprinkleCrystals } from "./utils/resources";
import { placeSleepingMonsters } from "./utils/creatures";

const monsterSpawner = getMonsterSpawner({
  retriggerMode: "automatic",
});

const BASE: PartialArchitect<unknown> = {
  ...DefaultCaveArchitect,
  monsterSpawnScript: ({ cavern, plan }) => {
    if (cavern.context.biome === "ice" && plan.fluid === Tile.LAVA) {
      return undefined;
    }
    if (cavern.context.biome === "lava" && plan.fluid !== Tile.LAVA) {
      return undefined;
    }
    return monsterSpawner({ cavern, plan });
  },
};

const FLOODED: readonly Architect<unknown>[] = [
  {
    name: "Lake",
    ...BASE,
    ...new RoughOyster(
      { of: Rough.WATER, grow: 2 },
      { of: Rough.FLOOR, shrink: 1, grow: 1 },
      { of: Rough.LOOSE_ROCK },
      { of: Rough.LOOSE_OR_HARD_ROCK },
    ),
    caveBid: ({ plan }) =>
      plan.fluid === Tile.WATER && plan.pearlRadius < 10 && 1,
  },
  {
    name: "Lake With Sleeping Monsters",
    ...BASE,
    ...new RoughOyster(
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
      placeSleepingMonsters(args, rng, count);
    },
  },
  {
    name: "Island",
    ...BASE,
    ...new RoughOyster(
      { of: Rough.ALWAYS_SOLID_ROCK, width: 0, grow: 0.7 },
      { of: Rough.ALWAYS_HARD_ROCK, width: 0, grow: 0.2 },
      { of: Rough.ALWAYS_LOOSE_ROCK, width: 0, grow: 0.2 },
      { of: Rough.ALWAYS_DIRT, grow: 0.5 },
      { of: Rough.ALWAYS_FLOOR, grow: 0.1 },
      { of: Rough.WATER, grow: 2 },
      { of: Rough.FLOOR, grow: 1 },
      { of: Rough.LOOSE_ROCK },
      { of: Rough.LOOSE_OR_HARD_ROCK },
    ),
    caveBid: ({ plan }) =>
      plan.fluid === Tile.WATER && plan.pearlRadius > 5 && 2,
  },
  {
    name: "Lava Lake",
    ...BASE,
    ...new RoughOyster(
      { of: Rough.LAVA, grow: 2 },
      { of: Rough.FLOOR, grow: 1 },
      { of: Rough.LOOSE_ROCK, shrink: 1 },
      { of: Rough.LOOSE_OR_HARD_ROCK },
    ),
    caveBid: ({ plan }) =>
      plan.fluid === Tile.LAVA && plan.pearlRadius < 10 && 1,
  },
  {
    name: "Lava Island",
    ...BASE,
    ...new RoughOyster(
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
    name: "Peninsula",
    ...BASE,
    ...new RoughOyster(
      { of: Rough.ALWAYS_SOLID_ROCK, width: 0, grow: 0.7 },
      { of: Rough.ALWAYS_HARD_ROCK, width: 0, grow: 0.2 },
      { of: Rough.ALWAYS_LOOSE_ROCK, width: 0, grow: 0.2 },
      { of: Rough.ALWAYS_DIRT, width: 0, grow: 0.5 },
      { of: Rough.ALWAYS_FLOOR, width: 2, grow: 0.1 },
      { of: Rough.BRIDGE_ON_WATER, grow: 2 },
      { of: Rough.LOOSE_ROCK },
      { of: Rough.AT_MOST_HARD_ROCK },
    ),
    caveBid: ({ plans, plan }) =>
      plan.fluid === Tile.WATER &&
      plan.pearlRadius > 5 &&
      isDeadEnd(plan) &&
      intersectsOnly(plans, plan, null) &&
      1,
  },
  {
    name: "Lava Peninsula",
    ...BASE,
    ...new RoughOyster(
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
    name: "Lava Stalagmite Cave",
    ...BASE,
    crystalsToPlace: ({ plan }) => plan.crystalRichness * plan.perimeter * 2,
    ...new RoughOyster(
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
      sprinkleCrystals(
        Math.max(args.cavern.context.caveCrystalSeamBias, 0.6),
        args,
      );
    },
    caveBid: ({ plan }) =>
      plan.fluid === Tile.LAVA &&
      plan.hasErosion &&
      plan.pearlRadius > 5 &&
      0.4,
  },
];

export default FLOODED;
