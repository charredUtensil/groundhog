import { PseudorandomStream } from "../common";
import { closestTo, Point } from "../common/geometry";
import { Grid } from "../common/grid";
import { Architect } from "../models/architect";
import { PlannedCavern } from "../models/cavern";
import { DiscoveryZone } from "../models/discovery_zone";
import { Plan } from "../models/plan";
import { randomlyInTile } from "../models/position";
import { Tile } from "../models/tiles";
import {
  Vehicle,
  VehicleFactory,
  VehicleTemplate,
  HOVER_SCOUT,
  RAPID_RIDER,
  SMALL_DIGGER,
  SMALL_TRANSPORT_TRUCK,
  TUNNEL_SCOUT,
  SMLC,
} from "../models/vehicle";
import { DiscoveredCavern } from "../transformers/03_plastic/01_discover";
import { StrataformedCavern } from "../transformers/03_plastic/03_strataform";
import { DefaultCaveArchitect, PartialArchitect } from "./default";
import { isDeadEnd } from "./utils/intersects";
import { mkRough, Rough } from "./utils/rough";
import { pickPoint } from "./utils/placement";
import { check, DzPriority, mkVars, transformPoint } from "./utils/script";
import { EnscribedCavern } from "../transformers/04_ephemera/02_enscribe";
import { LoreDie } from "../common/prng";
import {
  FOUND_ALL_LOST_MINERS,
  FOUND_LM_BREADCRUMB,
  FOUND_LOST_MINERS,
} from "../lore/graphs/events";
import { gObjectives } from "./utils/objectives";
import { filterTruthy } from "../common/utils";

export type LostMinersMetadata = {
  readonly tag: "lostMiners";
  readonly minersCount: number;
};

export const gLostMiners = mkVars("gLostMiners", [
  "remainingCaves",
  "onFoundAll",
  "messageFoundAll",
  "done",
]);

export function countLostMiners(cavern: PlannedCavern) {
  let lostMiners: number = 0;
  let lostMinerCaves: number = 0;
  cavern.plans.forEach((plan) => {
    if (plan.metadata?.tag === "lostMiners") {
      lostMinerCaves++;
      lostMiners += plan.metadata.minersCount;
    }
  });
  return { lostMiners, lostMinerCaves };
}

function getBreadcrumbPoint(
  cavern: DiscoveredCavern,
  minersPos: Point,
  minersDz: DiscoveryZone,
  plan: Plan<any>,
): Point {
  if (!plan.hops.length) {
    throw new Error("Reached spawn without a breadcrumb");
  }

  // Choose the neighboring plan which is closest to spawn (fewest hops).
  const neighborPlan = cavern.plans[plan.hops[plan.hops.length - 1]];

  const result = closestTo(
    minersPos,
    neighborPlan.innerPearl
      .flatMap((layer) => layer)
      // Find all the points in the inner pearl that are not walls and are in a
      // different discovery zone from the miners.
      .filter(([x, y]) => {
        const dz = cavern.discoveryZones.get(x, y);
        return dz && dz !== minersDz;
      }),
  );

  // If such a point exists, return it.
  if (result) {
    return result;
  }

  // If no points exist, recurse.
  return getBreadcrumbPoint(cavern, minersPos, minersDz, neighborPlan);
}

function placeBreadcrumbVehicles(
  cavern: StrataformedCavern,
  plan: Plan<LostMinersMetadata>,
  [x, y]: Point,
  vehicleFactory: VehicleFactory,
  rng: PseudorandomStream,
): Vehicle[] {
  const tile = cavern.tiles.get(x, y);
  const fluid = tile === Tile.LAVA || tile === Tile.WATER ? tile : null;
  const isMobFarm = cavern.plans[cavern.anchor].metadata?.tag === "mobFarm";
  const template = rng.weightedChoice<VehicleTemplate | null>(
    filterTruthy([
      !fluid && !isMobFarm && { item: HOVER_SCOUT, bid: 2 },
      !fluid && { item: SMALL_DIGGER, bid: 0.5 },
      !fluid && { item: SMALL_TRANSPORT_TRUCK, bid: 0.75 },
      !fluid && { item: SMLC, bid: 0.05 },
      !isMobFarm && fluid === Tile.WATER && { item: RAPID_RIDER, bid: 1 },
      !isMobFarm && { item: TUNNEL_SCOUT, bid: 0.25 },
      { item: null, bid: 0.0025 },
    ]),
  );
  if (template) {
    return [
      vehicleFactory.create({
        ...randomlyInTile({
          x,
          y,
          aimedAt: plan.path.baseplates[0].center,
          rng,
        }),
        planId: plan.id,
        template,
      }),
    ];
  }
  return [];
}

const pickMinerPoint = (
  plan: Plan<any>,
  {
    tiles,
    discoveryZones,
  }: {
    tiles: Grid<Tile>;
    discoveryZones: Grid<DiscoveryZone>;
  },
) =>
  pickPoint(plan, (x, y) => {
    const t = tiles.get(x, y);
    return !t?.isWall && !t?.isFluid && !discoveryZones.get(x, y)?.openOnSpawn;
  });

function getAbandonedEnts(
  cavern: EnscribedCavern,
  plan: Plan<LostMinersMetadata>,
) {
  const miner = cavern.miners.find((m) => m.planId === plan.id)!;
  const minersPoint: Point = [Math.floor(miner.x), Math.floor(miner.y)];
  const minersDz = cavern.discoveryZones.get(...minersPoint)!;

  const breadcrumb = cavern.vehicles.find((v) => {
    if (v.planId !== plan.id) {
      return false;
    }
    const dz = cavern.discoveryZones.get(Math.floor(v.x), Math.floor(v.y));
    return dz !== minersDz;
  });
  const breadcrumbPoint: Point | undefined = breadcrumb
    ? [Math.floor(breadcrumb.x), Math.floor(breadcrumb.y)]
    : undefined;
  return {
    minersPoint,
    breadcrumb,
    breadcrumbPoint,
  };
}

const BASE: PartialArchitect<LostMinersMetadata> = {
  ...DefaultCaveArchitect,
  prime: ({ cavern, plan }) => {
    const rng = cavern.dice.prime(plan.id);
    const minersCount = rng.betaInt({ a: 1, b: 2, min: 1, max: 5 });
    return { tag: "lostMiners", minersCount };
  },
  placeEntities: ({ cavern, plan, minerFactory, vehicleFactory }) => {
    const rng = cavern.dice.placeEntities(plan.id);
    // Place the lost miners
    const [x, y] =
      pickMinerPoint(plan, cavern) ??
      (() => {
        throw new Error("Nowhere to place lost miners");
      })();
    const dz = cavern.discoveryZones.get(x, y);
    if (!dz) {
      throw new Error("Lost Miners point is not discoverable");
    }
    if (dz.openOnSpawn) {
      throw new Error("Lost Miners point is discovered on spawn");
    }
    const miners = [];
    for (let i = 0; i < plan.metadata.minersCount; i++) {
      miners.push(
        minerFactory.create({
          planId: plan.id,
          ...randomlyInTile({ x, y, rng }),
        }),
      );
    }
    // Place a breadcrumb vehicle
    const breadcrumbPoint = getBreadcrumbPoint(cavern, [x, y], dz, plan);
    const vehicles = placeBreadcrumbVehicles(
      cavern,
      plan,
      breadcrumbPoint,
      vehicleFactory,
      rng,
    );
    return { miners, vehicles };
  },
  objectives: ({ cavern }) => {
    const { lostMiners, lostMinerCaves } = countLostMiners(cavern);
    const description =
      lostMiners === 1
        ? "Find the lost Rock Raider"
        : lostMinerCaves === 1
          ? "Find the cave with the lost Rock Radiers"
          : `Find ${lostMiners} lost Rock Raiders`;
    return {
      variables: [{ condition: `${gLostMiners.done}>0`, description }],
      sufficient: true,
    };
  },
  claimEventOnDiscover({ cavern, plan }) {
    const { minersPoint, breadcrumbPoint } = getAbandonedEnts(cavern, plan);
    return [
      { pos: breadcrumbPoint, priority: DzPriority.HINT },
      { pos: minersPoint, priority: DzPriority.OBJECTIVE },
    ];
  },
  scriptGlobals({ cavern, sb }) {
    const { lostMinerCaves } = countLostMiners(cavern);
    sb.declareInt(gLostMiners.remainingCaves, lostMinerCaves);
    sb.declareInt(gLostMiners.done, 0);
    sb.declareString(gLostMiners.messageFoundAll, {
      die: LoreDie.foundAllLostMiners,
      pg: FOUND_ALL_LOST_MINERS,
    });
    sb.event(
      gLostMiners.onFoundAll,
      `${gObjectives.met}+=1;`,
      `msg:${gLostMiners.messageFoundAll};`,
      `wait:3;`,
      `${gLostMiners.done}=1;`,
    );
  },
  script({ cavern, plan, sb }) {
    const rng = cavern.dice.script(plan.id);
    const { lostMinerCaves } = countLostMiners(cavern);
    const v = mkVars(`p${plan.id}LoMi`, [
      "msgFoundBreadcrumb",
      "msgFoundMiners",
      "wasFound",
    ]);

    const { minersPoint, breadcrumb, breadcrumbPoint } = getAbandonedEnts(
      cavern,
      plan,
    );
    const shouldPanOnMiners =
      cavern.ownsScriptOnDiscover[
        cavern.discoveryZones.get(...minersPoint)!.id
      ] === plan.id;
    const shouldMessageOnMiners = shouldPanOnMiners && lostMinerCaves > 1;
    const shouldPanMessageOnBreadcrumb =
      breadcrumbPoint &&
      cavern.ownsScriptOnDiscover[
        cavern.discoveryZones.get(...breadcrumbPoint)!.id
      ] === plan.id;

    if (shouldMessageOnMiners) {
      sb.declareString(v.msgFoundMiners, {
        rng,
        pg: FOUND_LOST_MINERS,
        state: {
          foundMinersOne: plan.metadata.minersCount <= 1,
          foundMinersTogether: plan.metadata.minersCount > 1,
        },
        format: {
          foundMiners: plan.metadata.minersCount,
        },
      });
    }
    sb.declareInt(v.wasFound, 0);
    sb.if(
      `change:${transformPoint(cavern, minersPoint)}`,
      shouldPanOnMiners && `pan:${transformPoint(cavern, minersPoint)};`,
      `${v.wasFound}=1;`,
      `${gLostMiners.remainingCaves}-=1;`,
      check(
        `${gLostMiners.remainingCaves}<=0`,
        gLostMiners.onFoundAll,
        shouldMessageOnMiners && `msg:${v.msgFoundMiners}`,
      ),
    );
    if (shouldPanMessageOnBreadcrumb) {
      sb.declareString(v.msgFoundBreadcrumb, {
        rng,
        pg: FOUND_LM_BREADCRUMB,
        format: {
          vehicle: breadcrumb!,
        },
      });
      sb.if(
        `change:${transformPoint(cavern, breadcrumbPoint)}`,
        `((${v.wasFound}>0))return;`,
        `pan:${transformPoint(cavern, breadcrumbPoint)};`,
        `msg:${v.msgFoundBreadcrumb};`,
      );
    }
  },
};

// The L.M.S. Explorer's teleporters just seem to be real lousy in ice
// caverns for some reason.
const MULTIPLIERS = { rock: 1.0, ice: 1.4, lava: 0.7 } as const;

const LOST_MINERS = [
  {
    name: "LostMiners",
    ...BASE,
    ...mkRough(
      { of: Rough.ALWAYS_FLOOR, width: 2, grow: 2 },
      { of: Rough.ALWAYS_LOOSE_ROCK, grow: 1 },
      { of: Rough.HARD_ROCK, grow: 0.5 },
    ),
    caveBid: ({ cavern, hops, plans, plan }) =>
      !plan.fluid &&
      plan.pearlRadius > 2 &&
      plan.pearlRadius < 10 &&
      hops.length > 3 &&
      hops.length <= 8 &&
      isDeadEnd(plan) &&
      plans.reduce(
        (r, p) => (p.metadata?.tag === "lostMiners" ? r + 1 : r),
        0,
      ) < 4 &&
      cavern.context.planWhimsy * MULTIPLIERS[cavern.context.biome],
  },
] as const satisfies readonly Architect<LostMinersMetadata>[];
export default LOST_MINERS;
