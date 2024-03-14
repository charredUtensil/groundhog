import { Architect } from "../models/architect";
import { DefaultCaveArchitect } from "./default";
import { Rough, RoughOyster } from "./oyster";

const SIMPLE_CAVE: readonly Architect[] = [
  {
    name: "Simple Cave (Filled)",
    ...DefaultCaveArchitect,
    ...new RoughOyster(
      { of: Rough.DIRT, width: 0, grow: 0.25 },
      { of: Rough.DIRT_OR_LOOSE_ROCK, grow: 1 },
      { of: Rough.LOOSE_OR_HARD_ROCK },
    ),
    caveBid: ({ plan }) => !plan.fluid && plan.pearlRadius < 4 && 0.04,
  },
  {
    name: "Simple Cave (Open)",
    ...DefaultCaveArchitect,
    ...new RoughOyster(
      { of: Rough.FLOOR, grow: 2 },
      { of: Rough.AT_MOST_DIRT, width: 0, grow: 0.5 },
      { of: Rough.AT_MOST_LOOSE_ROCK, grow: 1 },
      { of: Rough.AT_MOST_HARD_ROCK, grow: 0.25 },
      { of: Rough.VOID, width: 0, grow: 0.5 },
    ),
    caveBid: ({ plans, plan }) =>
      !plan.fluid &&
      plan.pearlRadius < 10 &&
      !plans.some((p) => plan.intersects[p.id] && p.fluid) &&
      2,
  },
  {
    name: "Simple Cave (Empty)",
    ...DefaultCaveArchitect,
    ...new RoughOyster(
      { of: Rough.FLOOR, grow: 2 },
      { of: Rough.DIRT, width: 0, grow: 0.1 },
      { of: Rough.DIRT_OR_LOOSE_ROCK, grow: 1 },
      { of: Rough.LOOSE_OR_HARD_ROCK, grow: 0.5 },
      { of: Rough.VOID, width: 0, grow: 0.5 },
    ),
    caveBid: ({ plan }) => !plan.fluid && plan.pearlRadius < 10 && 1,
  },
  {
    name: "Simple Cave (Filled, with Paths)",
    ...DefaultCaveArchitect,
    ...new RoughOyster(
      { of: Rough.FLOOR, width: 0, grow: 0.5 },
      { of: Rough.INVERT_TO_LOOSE_ROCK, grow: 0.5 },
      { of: Rough.INVERT_TO_DIRT, grow: 1 },
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
    name: "Simple Cave (Doughnut)",
    ...DefaultCaveArchitect,
    ...new RoughOyster(
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
];
export default SIMPLE_CAVE;
