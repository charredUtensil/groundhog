import { Architect } from "../models/architect";
import { defaultPlaceCrystals, defaultPlaceOre } from "./utils/resources";

type Partchitect = Omit<Architect, "name" | "rough" | "roughExtent">

const DefaultArchitect: Omit<Partchitect, "baroqueness"> = {
  crystals: ({ plan }) => plan.crystalRichness * plan.perimeter,
  ore: ({ plan }) => plan.oreRichness * plan.perimeter,
  placeRechargeSeam: () => {},
  placeBuildings: () => {},
  placeCrystals: defaultPlaceCrystals,
  placeOre: defaultPlaceOre,
  placeLandslides: () => {},
  placeErosion: () => {},
  placeEntities: () => {},
}

export const DefaultCaveArchitect: Partchitect = {
  ...DefaultArchitect,
  baroqueness: ({ cavern }) => cavern.context.caveBaroqueness,
};

export const DefaultHallArchitect: Partchitect = {
  ...DefaultArchitect,
  baroqueness: ({ cavern }) => cavern.context.hallBaroqueness,
};
