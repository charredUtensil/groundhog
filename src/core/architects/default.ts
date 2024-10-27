import { Architect, BaseMetadata } from "../models/architect";
import { TOOL_STORE } from "../models/building";
import { position } from "../models/position";
import { Tile } from "../models/tiles";
import { getBuildings } from "./utils/buildings";
import { sprinkleSlugHoles } from "./utils/creatures";
import { placeErosion, placeLandslides } from "./utils/hazards";
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
      placeEntities: () => ({}),
      objectives: () => undefined,
      maxSlope: undefined,
      claimEventOnDiscover: () => [],
    }) as PartialArchitect<any>,
);

export const DefaultSpawnArchitect: PartialArchitect<undefined> = {
  ...DefaultCaveArchitect,
  crystalsToPlace: () => 5,
  placeRechargeSeam: getPlaceRechargeSeams(1),
  placeBuildings: (args) => {
    const [toolStore] = getBuildings(
      {
        queue: [(pos) => TOOL_STORE.atTile({ ...pos, teleportAtStart: true })],
      },
      args,
    );
    toolStore.foundation.forEach(([x, y]) =>
      args.tiles.set(x, y, Tile.FOUNDATION),
    );
    args.openCaveFlags.set(...toolStore.foundation[0], true);
    return {
      buildings: [toolStore],
      cameraPosition: position({
        x: toolStore.x,
        y: toolStore.y,
        yaw: toolStore.yaw + Math.PI * 0.75,
        pitch: Math.PI / 4,
      }),
    };
  },
  maxSlope: 15,
};