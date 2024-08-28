import { Architect } from "../../models/architect";
import { placeLandslides } from "../utils/hazards";
import { HqMetadata } from "./base";
import { getPlaceBuildings } from "./base";
import { getPrime } from "./base";
import { BASE } from "./base";
import FIXED_COMPLETE from "./fixed_complete";
import ISLAND from "./island";
import LOST from "./lost";


export const ESTABLISHED_HQ = [
  {
    name: "Established HQ Spawn",
    ...BASE,
    prime: getPrime(10, false),
    placeBuildings: getPlaceBuildings({ discovered: true }),
    spawnBid: ({ plan }) => !plan.fluid && plan.pearlRadius > 5 && 0.5,
  },
  {
    name: "Ruined HQ Spawn",
    ...BASE,
    prime: getPrime(12, true),
    placeBuildings: getPlaceBuildings({
      discovered: true,
      from: 3,
    }),
    placeLandslides: (args) => placeLandslides({ min: 15, max: 60 }, args),
    spawnBid: ({ plan }) => !plan.fluid && plan.pearlRadius > 6 && 0.5,
  },
  ...FIXED_COMPLETE,
  ...ISLAND,
  ...LOST,
] as const satisfies readonly Architect<HqMetadata>[];

export default ESTABLISHED_HQ;
