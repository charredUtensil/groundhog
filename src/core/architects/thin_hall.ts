import { Architect } from "../models/architect";
import { DefaultHallArchitect } from "./default";
import { Rough, RoughOyster } from "./oyster";

const ThinHall = {
  ...DefaultHallArchitect,
};

const HARD_ROCK_MIN_CRYSTALS = 14;
//0 +
//Building.Type.POWER_STATION.crystals +
//Building.Type.SUPPORT_STATION.crystals + 1 +
//Building.Type.SUPER_TELEPORT.crystals + 1 +
//5):

const THIN_HALL: readonly Architect[] = [
  {
    name: "Thin Hall (Open)",
    ...ThinHall,
    ...new RoughOyster({ of: Rough.FLOOR }, { of: Rough.VOID, grow: 1 }),
    hallBid: ({ plan }) => !plan.fluid && 0.2,
  },
  {
    name: "Thin Hall (Filled)",
    ...ThinHall,
    ...new RoughOyster({ of: Rough.LOOSE_ROCK }, { of: Rough.VOID, grow: 1 }),
    hallBid: ({ plan }) => !plan.fluid && 0.1,
  },
  {
    name: "Thin Hall (Hard Rock)",
    ...ThinHall,
    ...new RoughOyster({ of: Rough.HARD_ROCK }, { of: Rough.VOID, grow: 1 }),
    hallBid: ({ plan, totalCrystals }) =>
      !plan.fluid && totalCrystals >= HARD_ROCK_MIN_CRYSTALS && 0.4,
  },
];
export default THIN_HALL