import { Architect } from "../models/architect";
import { Tile } from "../models/tiles";
import { DefaultCaveArchitect, PartialArchitect } from "./default";
import { Rough, RoughOyster } from "./utils/oyster";
import { intersectsOnly } from "./utils/intersects";
import { getMonsterSpawner } from "./utils/monster_spawner";

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
      intersectsOnly(plans, plan, Tile.WATER) &&
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
      intersectsOnly(plans, plan, Tile.LAVA) &&
      1,
  },
];

export default FLOODED;
