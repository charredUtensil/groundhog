import { Architect } from "../models/architect";
import {
  defaultPlaceCrystals,
  defaultPlaceOre,
  getPlaceRechargeSeams,
} from "./utils/resources";

export type PartialArchitect<T> = Omit<Architect<T>, "name" | "rough" | "roughExtent">

const DefaultArchitect: Omit<PartialArchitect<unknown>, "baroqueness"> = {
  crystals: ({ plan }) => plan.crystalRichness * plan.perimeter,
  ore: ({ plan }) => plan.oreRichness * plan.perimeter,
  prime: () => undefined,
  placeRechargeSeam: getPlaceRechargeSeams(),
  placeBuildings: () => {},
  placeCrystals: defaultPlaceCrystals,
  placeOre: defaultPlaceOre,
  placeLandslides: () => {},
  placeErosion: () => {},
  placeEntities: () => {},
};

export const DefaultCaveArchitect: PartialArchitect<unknown> = {
  ...DefaultArchitect,
  baroqueness: ({ cavern }) => cavern.context.caveBaroqueness,
};

export const DefaultHallArchitect: PartialArchitect<unknown> = {
  ...DefaultArchitect,
  baroqueness: ({ cavern }) => cavern.context.hallBaroqueness,
};
