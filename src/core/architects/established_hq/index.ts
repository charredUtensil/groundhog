import { Architect } from "../../models/architect";
import { placeLandslides } from "../utils/hazards";
import { HqMetadata } from "./base";
import { getPlaceBuildings } from "./base";
import { getPrime } from "./base";
import { BASE } from "./base";
import FIXED_COMPLETE from "./fixed_complete";
import GAS_LEAK from "./gas_leak";
import ISLAND from "./island";
import LOST from "./lost";

const ESTABLISHED_HQ = [
  {
    name: "Hq.Spawn.Established",
    ...BASE,
    prime: getPrime(10, false),
    placeBuildings: getPlaceBuildings({ discovered: true }),
    anchorBid: ({ plan }) => !plan.fluid && plan.pearlRadius > 5 && 0.5,
  },
  {
    name: "Hq.Spawn.Ruins",
    ...BASE,
    prime: getPrime(12, true),
    placeBuildings: getPlaceBuildings({
      discovered: true,
      from: 3,
    }),
    placeLandslides: (args) => placeLandslides({ min: 15, max: 60 }, args),
    anchorBid: ({ plan }) => !plan.fluid && plan.pearlRadius > 6 && 0.5,
  },
  ...FIXED_COMPLETE,
  ...GAS_LEAK,
  ...ISLAND,
  ...LOST,
] as const satisfies readonly Architect<HqMetadata>[];

export default ESTABLISHED_HQ;
