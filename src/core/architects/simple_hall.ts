import { Architect } from "../models/architect";
import { Tile } from "../models/tiles";
import { DefaultHallArchitect } from "./default";
import { Rough, RoughOyster } from "./oyster";
import { intersectsOnly } from "./utils/intersects";

const BASE: typeof DefaultHallArchitect = {
  ...DefaultHallArchitect
}

const SIMPLE_HALL: readonly Architect<unknown>[] = [
  {
    name: "Open Hall",
    ...BASE,
    ...new RoughOyster(
      { of: Rough.FLOOR, grow: 2 },
      { of: Rough.AT_MOST_LOOSE_ROCK, grow: 1 },
      { of: Rough.AT_MOST_HARD_ROCK },
      { of: Rough.VOID, grow: 1 },
    ),
    hallBid: ({ plan }) => !plan.fluid && plan.pearlRadius > 0 && 1,
  },
  {
    name: "Filled Hall",
    ...BASE,
    ...new RoughOyster(
      { of: Rough.DIRT, grow: 1 },
      { of: Rough.LOOSE_OR_HARD_ROCK },
      { of: Rough.VOID, grow: 1 },
    ),
    hallBid: ({ plan }) => !plan.fluid && plan.pearlRadius > 0 && 1,
  },
  {
    name: "River",
    ...BASE,
    ...new RoughOyster(
      { of: Rough.WATER, width: 2, grow: 1 },
      { of: Rough.AT_MOST_HARD_ROCK },
      { of: Rough.VOID, grow: 1 },
    ),
    hallBid: ({ plan }) => plan.fluid === Tile.WATER && 1,
  },
  {
    name: "Stream",
    ...BASE,
    ...new RoughOyster(
      { of: Rough.WATER, grow: 0.5 },
      { of: Rough.FLOOR, grow: 0.25, shrink: 1 },
      { of: Rough.DIRT_OR_LOOSE_ROCK, grow: 1 },
      { of: Rough.AT_MOST_HARD_ROCK, shrink: 1 },
    ),
    hallBid: ({ plans, plan }) => (
      plan.fluid === Tile.WATER &&
      intersectsOnly(plans, plan, Tile.WATER) &&
      1
    )
  },
  {
    name: "Lava River",
    ...BASE,
    ...new RoughOyster(
      { of: Rough.LAVA, width: 2, grow: 1 },
      { of: Rough.AT_MOST_HARD_ROCK, width: 0, grow: 1 },
      { of: Rough.VOID, grow: 1 },
    ),
    hallBid: ({ plan }) => plan.fluid === Tile.LAVA && 1,
  }
]

export default SIMPLE_HALL