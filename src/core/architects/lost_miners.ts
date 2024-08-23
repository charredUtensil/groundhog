import { PseudorandomStream } from "../common";
import { Point } from "../common/geometry";
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
} from "../models/vehicle";
import { DiscoveredCavern } from "../transformers/03_plastic/01_discover";
import { StrataformedCavern } from "../transformers/03_plastic/02_strataform";
import { DefaultCaveArchitect, PartialArchitect } from "./default";
import { isDeadEnd } from "./utils/intersects";
import { mkRough, Rough } from "./utils/rough";
import { pickPoint } from "./utils/placement";
import {
  DzPriorities,
  escapeString,
  eventChain,
  mkVars,
  scriptFragment,
  transformPoint,
} from "./utils/script";
import { EnscribedCavern } from "../transformers/04_ephemera/02_enscribe";
import { PreprogrammedCavern } from "../transformers/04_ephemera/03_preprogram";

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
  [minersX, minersY]: Point,
  minersDz: DiscoveryZone,
  plan: Plan<any>,
): Point {
  if (!plan.hops.length) {
    throw new Error("Reached spawn without a breadcrumb");
  }

  // Choose the neighboring plan which is closest to spawn (fewest hops).
  const neighborPlan = cavern.plans[plan.hops[plan.hops.length - 1]];

  const result = neighborPlan.innerPearl
    .flatMap((layer) => layer)
    // Find all the points in the inner pearl that are not walls and are in a
    // different discovery zone from the miners.
    .filter(([x, y]) => {
      const dz = cavern.discoveryZones.get(x, y);
      return dz && dz !== minersDz;
    })
    // Compute a^2 + b^2 for these points to get their relative distance and
    // choose the closest point to the miners.
    .map(
      ([x, y]) =>
        [x, y, (x - minersX) ** 2 + (y - minersY) ** 2] as [
          number,
          number,
          number,
        ],
    )
    .reduce(
      (r: [number, number, number] | null, p) => (r && r[2] < p[2] ? r : p),
      null,
    );

  // If such a point exists, return it.
  if (result) {
    return [result[0], result[1]];
  }

  // If no points exist, recurse.
  return getBreadcrumbPoint(cavern, [minersX, minersY], minersDz, neighborPlan);
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
  const template = rng.weightedChoice<VehicleTemplate | null>([
    { item: HOVER_SCOUT, bid: fluid ? 0 : 2 },
    { item: SMALL_DIGGER, bid: fluid ? 0 : 0.5 },
    { item: SMALL_TRANSPORT_TRUCK, bid: fluid ? 0 : 0.75 },
    { item: RAPID_RIDER, bid: fluid === Tile.WATER ? 1 : 0 },
    { item: TUNNEL_SCOUT, bid: 0.25 },
    { item: null, bid: 0.0025 },
  ]);
  if (template) {
    return [vehicleFactory.create({
      ...randomlyInTile({
        x,
        y,
        aimedAt: plan.path.baseplates[0].center,
        rng,
      }),
      planId: plan.id,
      template,
    })];
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

function getAbandonedEnts(cavern: EnscribedCavern, plan: Plan<LostMinersMetadata>) {
  const miner = cavern.miners.find(m => m.planId === plan.id)!;
  const minersPoint: Point = [Math.floor(miner.x), Math.floor(miner.y)];
  const minersDz = cavern.discoveryZones.get(...minersPoint)!;

  const breadcrumb = cavern.vehicles.find(v => {
    if (v.planId !== plan.id) {
      return false;
    }
    const dz = cavern.discoveryZones.get(Math.floor(v.x), Math.floor(v.y));
    return dz !== minersDz;
  })
  const breadcrumbPoint: Point | undefined =
    breadcrumb ? [Math.floor(breadcrumb.x), Math.floor(breadcrumb.y)] : undefined;
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
  placeEntities: ({
    cavern,
    plan,
    minerFactory,
    vehicleFactory,
  }) => {
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
      miners.push(minerFactory.create({ planId: plan.id, ...randomlyInTile({ x, y, rng }) }));
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
    return {miners, vehicles}
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
      {pos: breadcrumbPoint, priority: DzPriorities.HINT},
      {pos: minersPoint, priority: DzPriorities.OBJECTIVE},
    ];
  },
  scriptGlobals({ cavern }) {
    const { lostMinerCaves } = countLostMiners(cavern);
    const message = cavern.lore.foundAllLostMiners(cavern.dice).text;
    return scriptFragment(
      `# Globals: Lost Miners`,
      `int ${gLostMiners.remainingCaves}=${lostMinerCaves}`,
      `int ${gLostMiners.done}=0`,
      `string ${gLostMiners.messageFoundAll}="${escapeString(message)}"`,
      eventChain(
        gLostMiners.onFoundAll,
        `msg:${gLostMiners.messageFoundAll};`,
        `wait:3;`,
        `${gLostMiners.done}=1;`,
      ),
    );
  },
  script({ cavern, plan }) {
    const rng = cavern.dice.script(plan.id);
    const { lostMinerCaves } = countLostMiners(cavern);
    const v = mkVars(`p${plan.id}LostMiners`, [
      "msgFoundBreadcrumb",
      "msgFoundMiners",
      "onFoundBreadcrumb",
      "onFoundMiners",
      "onIncomplete",
    ]);

    const { minersPoint, breadcrumb, breadcrumbPoint } = getAbandonedEnts(cavern, plan);
    const shouldPanOnMiners =
      cavern.ownsScriptOnDiscover[cavern.discoveryZones.get(...minersPoint)!.id] === plan.id;
    const shouldMessageOnMiners = shouldPanOnMiners && lostMinerCaves > 1;
    const messageFoundMiners = shouldMessageOnMiners ? cavern.lore.foundLostMiners(
      rng, plan.metadata.minersCount,
    ).text : 'undefined';
    const shouldPanMessageOnBreadcrumb = 
      breadcrumbPoint && cavern.ownsScriptOnDiscover[cavern.discoveryZones.get(...breadcrumbPoint)!.id] === plan.id
    const messageFoundBreadcrumb = shouldPanMessageOnBreadcrumb ? cavern.lore.foundLostMinersBreadcrumb(
      rng, breadcrumb!
    ).text : 'undefined';

    return scriptFragment(
      `# P${plan.id}: Lost Miners`,
      shouldMessageOnMiners && `string ${v.msgFoundMiners}="${escapeString(messageFoundMiners)}"`,
      `if(change:${transformPoint(cavern, minersPoint)})[${v.onFoundMiners}]`,
      eventChain(
        v.onFoundMiners,
        shouldPanOnMiners && `pan:${transformPoint(cavern, minersPoint)};`,
        `${gLostMiners.remainingCaves}-=1;`,
        `((${gLostMiners.remainingCaves}>0))[${v.onIncomplete}][${gLostMiners.onFoundAll}];`,
      ),
      eventChain(
        v.onIncomplete,
        shouldMessageOnMiners && `msg:${v.msgFoundMiners};`
      ),
      shouldPanMessageOnBreadcrumb && scriptFragment(
        `string ${v.msgFoundBreadcrumb}="${escapeString(messageFoundBreadcrumb)}"`,
        `if(change:${transformPoint(cavern, breadcrumbPoint)})[${v.onFoundBreadcrumb}]`,
        eventChain(
          v.onFoundBreadcrumb,
          `pan:${transformPoint(cavern, breadcrumbPoint)};`,
          `msg:${v.msgFoundBreadcrumb};`,
        ),
      ),
    );
  },
};

// The L.M.S. Explorer's teleporters just seem to be real lousy in ice
// caverns for some reason.
const MULTIPLIERS = { rock: 1.0, ice: 1.4, lava: 0.7 } as const;

const LOST_MINERS = [
  {
    name: "Lost Miners",
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
      MULTIPLIERS[cavern.context.biome],
  },
] as const satisfies readonly Architect<LostMinersMetadata>[];
export default LOST_MINERS;
