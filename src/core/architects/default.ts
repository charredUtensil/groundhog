import { Architect } from "../models/architect";
import { FluidType } from "../models/tiles";
import { NegotiatedPlan } from "../transformers/01_planning/00_negotiate";
import { Pearl } from "../transformers/01_planning/04_pearl";
import { EnscribedCavern } from "../transformers/02_plastic/06_enscribe";
import { FencedCavern } from "../transformers/02_plastic/07_fence";
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
  placeBuildings: () => { },
  placeCrystals: defaultPlaceCrystals,
  placeOre: defaultPlaceOre,
  placeLandslides: () => { },
  placeErosion: () => { },
  placeEntities: () => { },
  scriptGlobals: () => undefined,
  script: () => undefined,
  monsterSpawnScript: () => undefined,
};

export const DefaultCaveArchitect: PartialArchitect<unknown> = {
  ...DefaultArchitect,
  baroqueness: ({ cavern }) => cavern.context.caveBaroqueness,
};

export const DefaultHallArchitect: PartialArchitect<unknown> = {
  ...DefaultArchitect,
  baroqueness: ({ cavern }) => cavern.context.hallBaroqueness,
};
