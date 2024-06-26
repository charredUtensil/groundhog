import { Architect } from "../models/architect";
import { placeErosion, placeLandslides } from "./utils/hazards";
import {
  getPlaceRechargeSeams,
  sprinkleCrystals,
  sprinkleOre,
} from "./utils/resources";

export type PartialArchitect<T> = Omit<
  Architect<T>,
  "name" | "rough" | "roughExtent"
>;

export const [DefaultCaveArchitect, DefaultHallArchitect] = (
  [
    {
      hasLandslidesChance: "caveHasLandslidesChance",
      landslideCooldownRange: "caveLandslideCooldownRange",
      baroqueness: "caveBaroqueness",
    },
    {
      hasLandslidesChance: "hallHasLandslidesChance",
      landslideCooldownRange: "hallLandslideCooldownRange",
      baroqueness: "hallBaroqueness",
    },
  ] as const
).map(
  ({
    hasLandslidesChance,
    landslideCooldownRange,
    baroqueness,
  }) =>
    ({
      baroqueness: ({ cavern }) => cavern.context[baroqueness],
      crystalsToPlace: ({ plan }) => plan.crystalRichness * plan.perimeter,
      crystalsFromMetadata: () => 0,
      ore: ({ plan }) => plan.oreRichness * plan.perimeter,
      prime: () => undefined,
      placeRechargeSeam: getPlaceRechargeSeams(),
      placeBuildings: () => {},
      placeCrystals: (args) => {
        return sprinkleCrystals(args);
      },
      placeOre: (args) => {
        return sprinkleOre(args);
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
      isHq: false,
      isLostMiners: false,
      isNomads: false,
      isRuin: false,
    }) as PartialArchitect<unknown>,
);
