import { Architect } from "../models/architect";
import {
  POWER_STATION,
  SUPER_TELEPORT,
  SUPPORT_STATION,
} from "../models/building";
import { DefaultHallArchitect, PartialArchitect } from "./default";
import { mkRough, Rough, weightedSprinkle } from "./utils/rough";

const BASE: PartialArchitect<undefined> = {
  ...DefaultHallArchitect,
};

const HARD_ROCK_MIN_CRYSTALS =
  POWER_STATION.crystals +
  SUPPORT_STATION.crystals +
  1 +
  SUPER_TELEPORT.crystals +
  1 +
  5;

const THIN_HALL = [
  {
    name: "ThinHall.Open",
    ...BASE,
    ...mkRough(
      { of: Rough.FLOOR },
      {
        of: weightedSprinkle(
          { item: Rough.AT_MOST_HARD_ROCK, bid: 1 },
          { item: Rough.VOID, bid: 10 },
        ),
      },
      { of: Rough.VOID, grow: 1 },
    ),
    hallBid: ({ plan }) => !plan.fluid && 0.2,
  },
  {
    name: "ThinHall.Filled",
    ...BASE,
    ...mkRough(
      {
        of: weightedSprinkle(
          { item: Rough.FLOOR, bid: 1 },
          { item: Rough.LOOSE_ROCK, bid: 0.5 },
        ),
      },
      { of: Rough.VOID, grow: 1 },
    ),
    hallBid: ({ plan }) => !plan.fluid && 0.1,
  },
  {
    name: "ThinHall.HardRock",
    ...BASE,
    ...mkRough({ of: Rough.HARD_ROCK }, { of: Rough.VOID, grow: 1 }),
    hallBid: ({ plan, totalCrystals }) =>
      !plan.fluid &&
      totalCrystals >= HARD_ROCK_MIN_CRYSTALS &&
      plan.path.exclusiveSnakeDistance < 10 &&
      0.7,
  },
] as const satisfies readonly Architect<undefined>[];
export default THIN_HALL;
