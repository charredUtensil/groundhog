import { Architect } from "../models/architect";
import { POWER_STATION, SUPER_TELEPORT, SUPPORT_STATION } from "../models/building";
import { DefaultHallArchitect } from "./default";
import { Rough, RoughOyster } from "./oyster";

const BASE: typeof DefaultHallArchitect = {
  ...DefaultHallArchitect,
};

const HARD_ROCK_MIN_CRYSTALS =
  POWER_STATION.crystals +
  SUPPORT_STATION.crystals + 1 +
  SUPER_TELEPORT.crystals + 1 +
  5;

const THIN_HALL: readonly Architect<unknown>[] = [
  {
    name: "Thin, Open Hall",
    ...BASE,
    ...new RoughOyster({ of: Rough.FLOOR }, { of: Rough.VOID, grow: 1 }),
    hallBid: ({ plan }) => !plan.fluid && 0.2,
  },
  {
    name: "Thin Filled Hall",
    ...BASE,
    ...new RoughOyster({ of: Rough.LOOSE_ROCK }, { of: Rough.VOID, grow: 1 }),
    hallBid: ({ plan }) => !plan.fluid && 0.1,
  },
  {
    name: "Thin Hard Rock Hall",
    ...BASE,
    ...new RoughOyster({ of: Rough.HARD_ROCK }, { of: Rough.VOID, grow: 1 }),
    hallBid: ({ plan, totalCrystals }) => (
      !plan.fluid &&
      totalCrystals >= HARD_ROCK_MIN_CRYSTALS &&
      plan.path.exclusiveSnakeDistance < 10 &&
      0.7
    ),
  },
];
export default THIN_HALL;
