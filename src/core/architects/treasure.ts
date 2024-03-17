import { Architect } from "../models/architect";
import { Tile } from "../models/tiles";
import { DefaultCaveArchitect } from "./default";
import { Rough, RoughOyster } from "./oyster";
import { intersectsOnly, isDeadEnd } from "./utils/intersects";

const BASE: typeof DefaultCaveArchitect = {
  ...DefaultCaveArchitect
}

const HOARD: typeof BASE = {
  ...BASE
}

const RICH: typeof BASE = {
  ...BASE
}

const TREASURE: readonly Architect[] = [
  {
    name: "Open Hoard",
    ...HOARD,
    ...new RoughOyster(
      { of: Rough.ALWAYS_FLOOR, width: 2, grow: 3},
      { of: Rough.LOOSE_ROCK, shrink: 1},
      { of: Rough.HARD_ROCK, grow: 0.5},
    ),
    caveBid: ({plans, plan}) => (
      !plan.fluid &&
      plan.path.baseplates.length === 1 &&
      isDeadEnd(plan) &&
      intersectsOnly(plans, plan, null) &&
      0.5
    ),
  },
  {
    name: "Sealed Hoard",
    ...HOARD,
    ...new RoughOyster(
      { of: Rough.ALWAYS_FLOOR, width: 1, grow: 3},
      { of: Rough.ALWAYS_LOOSE_ROCK},
      { of: Rough.ALWAYS_HARD_ROCK, grow: 0.5},
    ),
    caveBid: ({plan}) => (
      !plan.fluid &&
      plan.path.baseplates.length === 1 &&
      isDeadEnd(plan) &&
      0.5
    ),
  },
  {
    name: "Open Rich Cave",
    ...RICH,
    ...new RoughOyster(
      { of: Rough.ALWAYS_SOLID_ROCK, width: 0, grow: 1},
      { of: Rough.ALWAYS_HARD_ROCK, width: 0, grow: 0.5},
      { of: Rough.LOOSE_ROCK, grow: 2},
      { of: Rough.FLOOR, width: 2, shrink: 1, grow: 3},
      { of: Rough.LOOSE_ROCK, shrink: 1},
      { of: Rough.HARD_ROCK, grow: 0.5},
    ),
    caveBid: ({plan}) => (
      !plan.fluid &&
      plan.path.baseplates.length >= 1 &&
      isDeadEnd(plan) &&
      1
    ),
  },
  {
    name: "Rich Island",
    ...RICH,
    ...new RoughOyster(
      { of: Rough.ALWAYS_SOLID_ROCK, width: 0, grow: 1},
      { of: Rough.ALWAYS_HARD_ROCK, width: 0, grow: 0.5},
      { of: Rough.ALWAYS_LOOSE_ROCK, grow: 2},
      { of: Rough.WATER, width: 2, grow: 3},
      { of: Rough.LOOSE_ROCK, shrink: 1},
      { of: Rough.HARD_ROCK, grow: 0.5},
    ),
    caveBid: ({plan}) => (
      plan.fluid === Tile.WATER &&
      plan.pearlRadius > 3 &&
      plan.path.baseplates.length >= 1 &&
      isDeadEnd(plan) &&
      0.5
    ),
  },
  {
    name: "Peninsula Hoard",
    ...HOARD,
    ...new RoughOyster(
      { of: Rough.ALWAYS_FLOOR, width: 2, grow: 1},
      { of: Rough.BRIDGE_ON_WATER, width: 2, grow: 3},
      { of: Rough.LOOSE_ROCK, shrink: 1},
      { of: Rough.HARD_ROCK, grow: 0.5},
    ),
    caveBid: ({plans, plan}) => (
      plan.fluid === Tile.WATER &&
      plan.pearlRadius > 3 &&
      plan.path.baseplates.length >= 1 &&
      isDeadEnd(plan) &&
      intersectsOnly(plans, plan, null) &&
      0.5
    ),
  },
  {
    name: "Rich Lava Island",
    ...RICH,
    ...new RoughOyster(
      { of: Rough.ALWAYS_SOLID_ROCK, width: 0, grow: 1},
      { of: Rough.ALWAYS_HARD_ROCK, width: 0, grow: 0.5},
      { of: Rough.ALWAYS_LOOSE_ROCK, grow: 2},
      { of: Rough.LAVA, width: 2, grow: 3},
      { of: Rough.HARD_ROCK, grow: 0.5},
    ),
    caveBid: ({plan}) => (
      plan.fluid === Tile.WATER &&
      plan.pearlRadius > 3 &&
      plan.path.baseplates.length >= 1 &&
      isDeadEnd(plan) &&
      0.5
    ),
  },
  {
    name: "Lava Peninsula Hoard",
    ...HOARD,
    ...new RoughOyster(
      { of: Rough.ALWAYS_FLOOR, width: 2, grow: 1},
      { of: Rough.BRIDGE_ON_LAVA, width: 2, grow: 3},
      { of: Rough.HARD_ROCK, grow: 0.5},
    ),
    caveBid: ({plans, plan}) => (
      plan.fluid === Tile.LAVA &&
      plan.pearlRadius > 3 &&
      plan.path.baseplates.length >= 1 &&
      isDeadEnd(plan) &&
      intersectsOnly(plans, plan, null) &&
      0.5
    ),
  }
]
export default TREASURE