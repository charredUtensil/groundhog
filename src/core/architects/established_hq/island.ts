import { Point } from "../../common/geometry";
import { Grid } from "../../common/grid";
import { Architect } from "../../models/architect";
import {
  TOOL_STORE,
  POWER_STATION,
  SUPPORT_STATION,
  DOCKS,
  GEOLOGICAL_CENTER,
  MINING_LASER,
} from "../../models/building";
import { Plan } from "../../models/plan";
import { randomlyInTile } from "../../models/position";
import { Tile } from "../../models/tiles";
import { RAPID_RIDER } from "../../models/vehicle";
import { sprinkleCrystals } from "../utils/resources";
import { Rough, mkRough } from "../utils/rough";
import { transformPoint } from "../utils/script";
import { BASE, HqMetadata, getPlaceBuildings } from "./base";

const T0_BUILDINGS = [
  { bt: TOOL_STORE, required: true },
  { bt: DOCKS, required: true },
  { bt: POWER_STATION, required: true },
] as const;

const T0_CRYSTALS = T0_BUILDINGS.reduce((r, { bt }) => r + bt.crystals, 0);

const T1_BUILDINGS = [
  { bt: MINING_LASER },
  { bt: MINING_LASER },
  { bt: SUPPORT_STATION },
  { bt: GEOLOGICAL_CENTER },
] as const;

const T1_CRYSTALS = T1_BUILDINGS.reduce((r, { bt }) => r + bt.crystals, 0);

function findWaterTile(plan: Plan<any>, tiles: Grid<Tile>): Point {
  for (let ly = 0; ly < plan.innerPearl.length; ly++) {
    const layer = plan.innerPearl[ly];
    for (let i = 0; i < layer.length; i++) {
      if (tiles.get(...layer[i]) === Tile.WATER) {
        return layer[i];
      }
    }
  }
  throw new Error("Failed to find water tile");
}

export const ISLAND_BASE: Pick<
  Architect<HqMetadata>,
  | "crystalsFromMetadata"
  | "prime"
  | "placeBuildings"
  | "placeCrystals"
  | "placeEntities"
  | "script"
> = {
  crystalsFromMetadata: (metadata) =>
    RAPID_RIDER.crystals + metadata.crystalsInBuildings,
  prime: ({ cavern, plan }) => {
    const rng = cavern.dice.prime(plan.id);
    const crystalsInBuildings = rng.betaInt({
      a: 1,
      b: 1.75,
      min: T0_CRYSTALS,
      max: T0_CRYSTALS + T1_CRYSTALS + 1,
    });
    return {
      crystalsInBuildings,
      ruin: false,
      special: null,
      tag: "hq",
    };
  },
  placeBuildings: getPlaceBuildings({
    discovered: true,
    from: 1,
    templates: (rng) => [...T0_BUILDINGS, ...rng.shuffle(T1_BUILDINGS)],
  }),
  placeCrystals: (args) => sprinkleCrystals(args, { seamBias: 1 }),
  placeEntities: ({ cavern, plan, minerFactory, vehicleFactory }) => {
    const rng = cavern.dice.placeEntities(plan.id);
    const [x, y] = findWaterTile(plan, cavern.tiles);
    const pos = randomlyInTile({ rng, x, y });
    const miner = minerFactory.create({
      ...pos,
      planId: plan.id,
      loadout: ["Drill", "JobSailor"],
    });
    const vehicles = [
      vehicleFactory.create({
        ...pos,
        planId: plan.id,
        driverId: miner.id,
        template: RAPID_RIDER,
        upgrades: ["UpAddDrill"],
      }),
    ];
    return { miners: [miner], vehicles };
  },
  script: ({ cavern, plan, sb }) => {
    plan.innerPearl.forEach((ly) =>
      ly.forEach((pos) => {
        if (cavern.tiles.get(...pos)?.isWall) {
          const tp = transformPoint(cavern, pos);
          sb.if(`change:${tp}`, `place:${tp},${Tile.WATER.id};`);
        }
      }),
    );
  },
};

const ISLAND = [
  {
    name: "Hq.Island",
    ...BASE,
    ...ISLAND_BASE,
    ...mkRough(
      { of: Rough.ALWAYS_FLOOR, width: 3 },
      { of: Rough.FLOOR, width: 0, grow: 1 },
      { of: Rough.WATER, width: 2, grow: 2 },
      { of: Rough.MIX_FRINGE },
    ),
    anchorBid: ({ cavern, plan }) =>
      plan.fluid === Tile.WATER &&
      plan.lakeSize > 3 &&
      plan.path.baseplates.length === 1 &&
      plan.pearlRadius > 5 &&
      cavern.context.anchorWhimsy * 0.2,
  },
] satisfies Architect<HqMetadata>[];

export default ISLAND;
