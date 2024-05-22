import { Architect } from "../models/architect";
import { placeErosion, placeLandslides } from "./utils/hazards";
import {
  getPlaceRechargeSeams, sprinkleCrystals, sprinkleOre,
} from "./utils/resources";

export type PartialArchitect<T> = Omit<
  Architect<T>,
  "name" | "rough" | "roughExtent"
>;

export const [DefaultCaveArchitect, DefaultHallArchitect] = ([
  {
    crystalSeamBias: 'caveCrystalSeamBias',
    oreSeamBias: 'caveOreSeamBias',
    hasLandslidesChance: 'caveHasLandslidesChance',
    landslideCooldownRange: 'caveLandslideCooldownRange',
    baroqueness: 'caveBaroqueness',
  },
  {
    crystalSeamBias: 'hallCrystalSeamBias',
    oreSeamBias: 'hallOreSeamBias',
    hasLandslidesChance: 'hallHasLandslidesChance',
    landslideCooldownRange: 'hallLandslideCooldownRange',
    baroqueness: 'hallBaroqueness',
  },
] as const).map(({
  crystalSeamBias,
  oreSeamBias,
  hasLandslidesChance,
  landslideCooldownRange,
  baroqueness,
}) => ({
  baroqueness: ({ cavern }) => cavern.context[baroqueness],
  crystals: ({ plan }) => plan.crystalRichness * plan.perimeter,
  ore: ({ plan }) => plan.oreRichness * plan.perimeter,
  prime: () => undefined,
  placeRechargeSeam: getPlaceRechargeSeams(),
  placeBuildings: () => {},
  placeCrystals: (args) => {
    return sprinkleCrystals(
      args.cavern.context[crystalSeamBias],
      args,
    );
  },
  placeOre: (args) => {
    return sprinkleOre(
      args.cavern.context[oreSeamBias],
      args,
    );
  },
  placeLandslides: (args) => {
    if (
      args.cavern.dice
        .placeLandslides(args.plan.id)
        .chance(args.cavern.context[hasLandslidesChance])
    ) {
      placeLandslides(args.cavern.context[landslideCooldownRange], args);
    }
  },
  placeErosion: (args) => placeErosion(30, 10, args),
  placeEntities: () => {},
  objectives: () => undefined,
  maxSlope: undefined,
  scriptGlobals: () => undefined,
  script: () => undefined,
  monsterSpawnScript: () => undefined,
} as PartialArchitect<unknown>));
