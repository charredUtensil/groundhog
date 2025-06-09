import { Mutable } from "../common";
import { Architect, BaseMetadata } from "../models/architect";
import { TOOL_STORE } from "../models/building";
import { position } from "../models/position";
import { Tile } from "../models/tiles";
import { getBuildings } from "./utils/buildings";
import { sprinkleSlugHoles } from "./utils/creatures";
import { placeErosion, placeLandslides, preErode } from "./utils/hazards";
import {
  getPlaceRechargeSeams,
  sprinkleCrystals,
  sprinkleOre,
} from "./utils/resources";

export type PartialArchitect<T extends BaseMetadata> = Omit<
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
  ({ hasLandslidesChance, landslideCooldownRange, baroqueness }) =>
    ({
      baroqueness: ({ cavern }) => cavern.context[baroqueness],
      crystalsToPlace: ({ plan }) => plan.crystalRichness * plan.perimeter,
      crystalsFromMetadata: () => 0,
      ore: ({ plan }) => plan.oreRichness * plan.perimeter,
      prime: () => undefined,
      placeRechargeSeam: getPlaceRechargeSeams(),
      placeBuildings: () => ({}),
      placeCrystals: (args) => {
        return sprinkleCrystals(args);
      },
      placeOre: (args) => {
        return sprinkleOre(args);
      },
      placeSlugHoles(args) {
        return sprinkleSlugHoles(args);
      },
      preErode: (args) => preErode(args),
      placeLandslides: (args) => {
        if (
          args.cavern.dice
            .placeLandslides(args.plan.id)
            .chance(args.cavern.context[hasLandslidesChance])
        ) {
          placeLandslides(args.cavern.context[landslideCooldownRange], args);
        }
      },
      placeErosion: (args) => placeErosion(args),
      placeEntities: () => ({}),
      maxSlope: undefined,
      claimEventOnDiscover: () => [],
    }) as PartialArchitect<any>,
);

export const DefaultSpawnArchitect: PartialArchitect<any> = {
  ...DefaultCaveArchitect,
  crystalsToPlace: () => 5,
  placeRechargeSeam: getPlaceRechargeSeams(1),
  placeBuildings: (args) => {
    const [toolStore] = getBuildings(
      {
        queue: [
          {
            bt: TOOL_STORE,
            args: { teleportAtStart: true },
            required: true,
          },
        ],
      },
      args,
    );
    toolStore.foundation.forEach(([x, y]) =>
      args.tiles.set(x, y, Tile.FOUNDATION),
    );
    args.openCaveFlags.set(...toolStore.foundation[0], true);
    const result: Mutable<ReturnType<Architect<any>["placeBuildings"]>> = {
      buildings: [toolStore],
    };
    if (args.plan.id === args.cavern.anchor) {
      result.cameraPosition = position({
        x: toolStore.x,
        y: toolStore.y,
        yaw: toolStore.yaw + Math.PI * 0.75,
        pitch: Math.PI / 4,
      });
    }
    return result;
  },
  maxSlope: 15,
};
