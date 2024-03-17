import { Architect } from "../models/architect";
import {
  defaultPlaceCrystals,
  defaultPlaceOre,
  getPlaceRechargeSeams,
} from "./utils/resources";

const DefaultArchitect: Omit<
  Architect,
  "name" | "baroqueness" | "rough" | "roughExtent"
> = {
  crystals: ({ plan }) => plan.crystalRichness * plan.perimeter,
  ore: ({ plan }) => plan.oreRichness * plan.perimeter,
  placeRechargeSeam: getPlaceRechargeSeams(),
  placeBuildings: () => {},
  placeCrystals: defaultPlaceCrystals,
  placeOre: defaultPlaceOre,
  placeLandslides: () => {},
  placeErosion: () => {},
  placeEntities: () => {},
};

export const DefaultCaveArchitect: Omit<
  Architect,
  "name" | "rough" | "roughExtent"
> = {
  ...DefaultArchitect,
  baroqueness: ({ cavern }) => cavern.context.caveBaroqueness,
};

export const DefaultHallArchitect: Omit<
  Architect,
  "name" | "rough" | "roughExtent"
> = {
  ...DefaultArchitect,
  baroqueness: ({ cavern }) => cavern.context.hallBaroqueness,
};
