import { Architect } from "../models/architect";
import { DefaultCaveArchitect, PartialArchitect } from "./default";
import { mkRough, Rough } from "./utils/rough";
import { getPlaceRechargeSeams, sprinkleOre } from "./utils/resources";
import { position, randomlyInTile } from "../models/position";
import { EventChainLine } from "./utils/script";
import { ALL_BUILDINGS, ELECTRIC_FENCE_ID, TOOL_STORE } from "../models/building";
import {
  TUNNEL_TRANSPORT,
  LMLC,
} from "../models/vehicle";
import { pickPoint } from "./utils/placement";
import { CavernContext } from "../common";
import { filterTruthy } from "../common/utils";
import { Tile } from "../models/tiles";

const METADATA = { tag: "rtg" } as const;

//n.b. Since vehicles are VIP, their crystals are effectively off-limits.

const BASE: PartialArchitect<typeof METADATA> = {
  ...DefaultCaveArchitect,
  prime: () => METADATA,
  mod: (cavern) => {
    const context: CavernContext = {
      ...cavern.context,
      caveCrystalSeamBias: 0.2,
      hallHasRechargeSeamChance: 0.2,
      caveHasLandslidesChance: 0.7,
      hallHasLandslidesChance: 0.9,
      caveLandslideCooldownRange: { min: 5, max: 60 },
      hallLandslideCooldownRange: { min: 10, max: 90 },
      globalHostilesCooldown: 120,
      ...(cavern.context.hasMonsters ? {} : {crystalGoalRatio: 0.4}),
      ...cavern.initialContext,
    }
    return ({ ...cavern, context, oxygen: [1000, 2000] });
  },
  placeRechargeSeam: getPlaceRechargeSeams(1),
  placeBuildings: ({ plan, tiles, openCaveFlags }) => {
    openCaveFlags.set(
      ...pickPoint(plan, (x, y) => {
        const t = tiles.get(x, y);
        return !!t && !t.isWall;
      })!,
      true,
    );
    return {};
  },
  placeEntities: ({ cavern, plan, minerFactory, vehicleFactory }) => {
    const rng = cavern.dice.placeEntities(plan.id);
    const [[x0, y0], [x1, y1]] = rng.shuffle(
      plan.innerPearl.flatMap((ly, i) => i < 3 ? ly.filter(
      pos => cavern.discoveryZones.get(...pos)?.openOnSpawn
    ) : []));
    const miners = [
      minerFactory.create({
        ...randomlyInTile({x: x0, y: y0, rng}),
        planId: plan.id,
        loadout: [
          "Drill",
          "Shovel",
          "JobDriver",
        ]
      }),
      minerFactory.create({
        ...randomlyInTile({x: x1, y: y1, rng}),
        planId: plan.id,
        loadout: [
          "Drill",
          "Shovel",
          "JobPilot",
        ]
      }),
    ];
    const vehicles = [
      vehicleFactory.create({
        ...position(miners[0]),
        driverId: miners[0].id,
        planId: plan.id,
        template: LMLC,
        upgrades: filterTruthy([
          "UpEngine",
          "UpLaser",
          cavern.plans.some(p => p.fluid === Tile.LAVA) && "UpAddNav",
        ]),
        essential: true,
      }),
      vehicleFactory.create({
        ...position(miners[1]),
        driverId: miners[1].id,
        planId: plan.id,
        template: TUNNEL_TRANSPORT,
        essential: true,
      }),
    ];
    return {
      vehicles,
      miners,
      cameraPosition: position({
        x: miners[0].x,
        y: miners[0].y,
        aimedAt: plan.path.baseplates[0].center,
        pitch: Math.PI / 4,
      }),
    };
  },
  scriptGlobals({ sb }) {
    sb.onInit(
      ...ALL_BUILDINGS.map(b =>
        b === TOOL_STORE ? null : `disable:${b.id};` satisfies EventChainLine
      ),
      `disable:${ELECTRIC_FENCE_ID};`,
    )
  },
};

const RTG = [
  {
    name: "RTG",
    ...BASE,
    ...mkRough(
      { of: Rough.ALWAYS_FLOOR, width: 2, grow: 1 },
      { of: Rough.FLOOR, grow: 1 },
      { of: Rough.AT_MOST_LOOSE_ROCK, grow: 1 },
      { of: Rough.MIX_FRINGE },
    ),
    crystalsToPlace: ({ plan }) =>
      Math.max(plan.crystalRichness * plan.perimeter, 5),
    ore: ({ plan }) => Math.max(plan.oreRichness * plan.perimeter, 8),
    placeOre: (args) => {
      return sprinkleOre(args, { seamBias: 1 });
    },
    anchorBid: ({ cavern, plan }) =>
      cavern.context.hasAirLimit &&
      !plan.fluid &&
      plan.pearlRadius > 3 &&
      0.2,
  },
] as const satisfies readonly Architect<typeof METADATA>[];
export default RTG;
