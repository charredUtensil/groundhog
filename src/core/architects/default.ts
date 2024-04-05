import { Architect } from "../models/architect";
import { placeErosion, placeLandslides } from "./utils/hazards";
import {
  defaultPlaceCrystals,
  defaultPlaceOre,
  getPlaceRechargeSeams,
} from "./utils/resources";

export type PartialArchitect<T> = Omit<
  Architect<T>,
  "name" | "rough" | "roughExtent"
>;

const DefaultArchitect: Omit<
  PartialArchitect<unknown>,
  "baroqueness" | "placeLandslides"
> = {
  crystals: ({ plan }) => plan.crystalRichness * plan.perimeter,
  ore: ({ plan }) => plan.oreRichness * plan.perimeter,
  prime: () => undefined,
  placeRechargeSeam: getPlaceRechargeSeams(),
  placeBuildings: () => {},
  placeCrystals: defaultPlaceCrystals,
  placeOre: defaultPlaceOre,
  placeErosion: (args) => placeErosion(30, 10, args),
  placeEntities: () => {},
  scriptGlobals: () => undefined,
  script: () => undefined,
  monsterSpawnScript: () => undefined,
};

export const DefaultCaveArchitect: PartialArchitect<unknown> = {
  ...DefaultArchitect,
  baroqueness: ({ cavern }) => cavern.context.caveBaroqueness,
  placeLandslides: (args) => {
    if (
      args.cavern.dice
        .placeLandslides(args.plan.id)
        .chance(args.cavern.context.caveHasLandslidesChance)
    ) {
      placeLandslides(args.cavern.context.caveLandslideCooldownRange, args);
    }
  },
};

export const DefaultHallArchitect: PartialArchitect<unknown> = {
  ...DefaultArchitect,
  baroqueness: ({ cavern }) => cavern.context.hallBaroqueness,
  placeLandslides: (args) => {
    if (
      args.cavern.dice
        .placeLandslides(args.plan.id)
        .chance(args.cavern.context.caveHasLandslidesChance)
    ) {
      placeLandslides(args.cavern.context.hallLandslideCooldownRange, args);
    }
  },
};
