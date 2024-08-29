import { Architect } from "../models/architect";
import { DefaultCaveArchitect, PartialArchitect } from "./default";
import { mkRough, Rough } from "./utils/rough";
import { intersectsAny, intersectsOnly, isDeadEnd } from "./utils/intersects";
import { getPlaceRechargeSeams, sprinkleOre } from "./utils/resources";
import { position, randomlyInTile } from "../models/position";
import { pickPoint } from "./utils/placement";
import {
  escapeString,
  eventChain,
  mkVars,
  scriptFragment,
} from "./utils/script";
import { SUPPORT_STATION } from "../models/building";
import { Tile } from "../models/tiles";
import {
  VehicleTemplate,
  HOVER_SCOUT,
  RAPID_RIDER,
  SMALL_DIGGER,
  SMALL_TRANSPORT_TRUCK,
  SMLC,
  TUNNEL_SCOUT,
  Vehicle,
} from "../models/vehicle";
import { Loadout, Miner } from "../models/miner";
import { filterTruthy, pairEach } from "../common/utils";
import { plotLine } from "../common/geometry";
import { gLostHq } from "./established_hq";

export type NomadsMetadata = {
  readonly tag: "nomads";
  readonly minersCount: number;
  readonly vehicles: readonly VehicleTemplate[];
};

const VEHICLE_BIDS = [
  { item: HOVER_SCOUT, bid: 1 },
  { item: SMALL_DIGGER, bid: 4 },
  { item: SMALL_TRANSPORT_TRUCK, bid: 1 },
  { item: SMLC, bid: 2 },
  { item: TUNNEL_SCOUT, bid: 1 },
  { item: null, bid: 1 },
] as const;

export const gNomads = mkVars("gNomads", [
  "messageBuiltBase",
  "onBuiltBase",
  "onInit",
  "onFoundHq",
]);

const BASE: PartialArchitect<NomadsMetadata> = {
  ...DefaultCaveArchitect,
  crystalsToPlace: () => 5,
  crystalsFromMetadata: (metadata) =>
    metadata.vehicles.reduce((r, v) => r + v.crystals, 0),
  prime: ({ cavern, plan }) => {
    const rng = cavern.dice.prime(plan.id);
    const minersCount = rng.betaInt({ a: 1, b: 3, min: 1, max: 4 });
    const vehicles = filterTruthy([rng.weightedChoice(VEHICLE_BIDS)]);
    return { tag: "nomads", minersCount, vehicles };
  },
  placeRechargeSeam: getPlaceRechargeSeams(1),
  placeBuildings: ({ cavern, plan, tiles, openCaveFlags }) => {
    openCaveFlags.set(
      ...pickPoint(plan, (x, y) => {
        const t = tiles.get(x, y);
        return !!t && !t.isWall;
      })!,
      true,
    );
    // If there is an HQ, ensure it is accessible to the nomads.
    cavern.plans
      .find((p) => p.metadata?.tag === "hq")
      ?.hops.forEach((hopId) => {
        pairEach(cavern.plans[hopId].path.baseplates, (a, b) => {
          for (const pos of plotLine(a.center, b.center)) {
            if (tiles.get(...pos) === Tile.HARD_ROCK) {
              tiles.set(...pos, Tile.LOOSE_ROCK);
            }
          }
        });
      });
    return {};
  },
  placeEntities: ({ cavern, plan, minerFactory, vehicleFactory }) => {
    const rng = cavern.dice.placeEntities(plan.id);
    const [x, y] = pickPoint(
      plan,
      (x, y) =>
        !!(
          cavern.discoveryZones.get(x, y)?.openOnSpawn &&
          !cavern.tiles.get(x, y)!.isFluid
        ),
    )!;
    const vehicles = plan.metadata.vehicles.map((template) => {
      if (template.kind === "sea") {
        const p = pickPoint(
          plan,
          (x, y) =>
            !!(
              cavern.discoveryZones.get(x, y)?.openOnSpawn &&
              cavern.tiles.get(x, y) === Tile.WATER
            ),
        );
        if (!p) {
          throw new Error(`Failed to place sea vehicle in plan ${plan.id}`);
        }
        return vehicleFactory.create({
          ...randomlyInTile({ x: p[0], y: p[1], rng }),
          planId: plan.id,
          template,
        });
      }
      return vehicleFactory.create({
        ...randomlyInTile({ x, y, rng }),
        planId: plan.id,
        template,
      });
    });
    const miners: Miner[] = [];
    for (let i = 0; i < plan.metadata.minersCount; i++) {
      const driving = vehicles[i] as Vehicle | undefined;
      const pos = driving ? position(driving) : randomlyInTile({ x, y, rng });
      const loadout: Loadout[] = filterTruthy([
        "Drill",
        (i === 0 || rng.chance(0.25)) && "JobGeologist",
        driving?.template.job,
      ]);
      const miner = minerFactory.create({
        ...pos,
        planId: plan.id,
        loadout,
      });
      if (vehicles[i]) {
        vehicles[i] = { ...vehicles[i], driverId: miner.id };
      }
      miners.push(miner);
    }
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
  scriptGlobals({ cavern }) {
    if (cavern.plans.some((plan) => plan.metadata?.tag === "hq")) {
      // Has HQ: Disable everything until it's found.
      return scriptFragment(
        "# Globals: Nomads with Lost HQ",
        `if(time:0)[${gNomads.onInit}]`,
        eventChain(
          gNomads.onInit,
          "disable:miners;",
          "disable:buildings;",
          "disable:vehicles;",
        ),
        `if(${gLostHq.foundHq}>0)[${gNomads.onFoundHq}]`,
        eventChain(
          gNomads.onFoundHq,
          "enable:miners;",
          "enable:buildings;",
          "enable:vehicles;",
        ),
      );
    }

    // Acknowledge the construction of a Support Station.
    const msg = escapeString(cavern.lore.nomadsSettled(cavern.dice).text);

    return scriptFragment(
      "# Globals: Nomads, no HQ",
      `string ${gNomads.messageBuiltBase}="${msg}"`,
      `if(${SUPPORT_STATION.id}.new)[${gNomads.onBuiltBase}]`,
      eventChain(gNomads.onBuiltBase, `msg:${gNomads.messageBuiltBase};`),
    );
  },
};

const NOMAD_SPAWN = [
  {
    name: "Nomad Spawn",
    ...BASE,
    ...mkRough(
      { of: Rough.ALWAYS_FLOOR, width: 2, grow: 2 },
      { of: Rough.AT_MOST_LOOSE_ROCK, grow: 1 },
      { of: Rough.MIX_FRINGE },
    ),
    crystalsToPlace: ({ plan }) =>
      Math.max(plan.crystalRichness * plan.perimeter, 5),
    ore: ({ plan }) => Math.max(plan.oreRichness * plan.perimeter, 10),
    placeOre: (args) => {
      return sprinkleOre(args, { seamBias: 1 });
    },
    spawnBid: ({ cavern, plan }) =>
      !plan.fluid &&
      plan.pearlRadius > 0 &&
      intersectsOnly(cavern.plans, plan, null) &&
      (isDeadEnd(plan) ? 1 : 0.1),
  },
  {
    name: "Nomad Spawn Peninsula",
    ...BASE,
    ...mkRough(
      { of: Rough.ALWAYS_FLOOR, grow: 2 },
      { of: Rough.BRIDGE_ON_WATER, width: 2, grow: 0.5 },
      { of: Rough.FLOOR },
      { of: Rough.AT_MOST_LOOSE_ROCK, grow: 1 },
      { of: Rough.MIX_FRINGE },
    ),
    prime: () => ({ tag: "nomads", minersCount: 1, vehicles: [RAPID_RIDER] }),
    spawnBid: ({ cavern, plan }) =>
      plan.fluid === Tile.WATER &&
      plan.pearlRadius > 4 &&
      intersectsAny(cavern.plans, plan, null) &&
      0.5,
  },
  {
    name: "Nomad Spawn Lava Peninsula",
    ...BASE,
    ...mkRough(
      { of: Rough.ALWAYS_FLOOR, grow: 2 },
      { of: Rough.BRIDGE_ON_LAVA, width: 2, grow: 0.5 },
      { of: Rough.FLOOR },
      { of: Rough.AT_MOST_LOOSE_ROCK, grow: 1 },
      { of: Rough.AT_MOST_HARD_ROCK },
    ),
    prime: () => ({ tag: "nomads", minersCount: 1, vehicles: [TUNNEL_SCOUT] }),
    spawnBid: ({ cavern, plan }) =>
      plan.fluid === Tile.LAVA &&
      plan.pearlRadius > 4 &&
      intersectsAny(cavern.plans, plan, null) &&
      0.5,
  },
] as const satisfies readonly Architect<NomadsMetadata>[];
export default NOMAD_SPAWN;
