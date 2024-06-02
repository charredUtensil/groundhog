import { PseudorandomStream } from "../common";
import { Point } from "../common/geometry";
import { Grid } from "../common/grid";
import { Architect } from "../models/architect";
import { PlannedCavern } from "../models/cavern";
import { DiscoveryZone } from "../models/discovery_zone";
import { Plan } from "../models/plan";
import { randomlyInTile } from "../models/position";
import { Tile } from "../models/tiles";
import { Vehicle, VehicleFactory, VehicleTemplate } from "../models/vehicle";
import { DiscoveredCavern } from "../transformers/03_plastic/01_discover";
import { StrataformedCavern } from "../transformers/03_plastic/02_strataform";
import { DefaultCaveArchitect, PartialArchitect } from "./default";
import { isDeadEnd } from "./utils/intersects";
import { Rough, RoughOyster } from "./utils/oyster";
import { pickPoint } from "./utils/placement";
import { escapeString, mkVars, transformPoint } from "./utils/script";

type Metadata = {
  readonly minersCount: number;
};

const g = mkVars("gFoundMiners", [
  "lostMinersCount",
  "onFoundAll",
  "messageFoundAll",
  "done",
]);

export function countLostMiners(cavern: PlannedCavern) {
  let lostMiners: number = 0;
  let lostMinerCaves: number = 0;
  cavern.plans.forEach((plan) => {
    if (plan.architect.isLostMiners) {
      const metadata = plan.metadata as Metadata;
      lostMinerCaves++;
      lostMiners += metadata.minersCount;
    }
  });
  return { lostMiners, lostMinerCaves };
}

function getBreadcrumbPoint(
  cavern: DiscoveredCavern,
  [minersX, minersY]: Point,
  minersDz: DiscoveryZone,
  plan: Plan,
): Point {
  // Choose the neighboring plan which is closest to spawn (fewest hops).
  const neighborPlan = plan.intersects.reduce((r, _, i) => {
    const p = cavern.plans[i];
    return p.hops < r.hops ? p : r;
  }, plan);

  // Prevent infinite loops - shouldn't happen under normal operation since
  // eventually we should reach the spawn, we already asserted that the
  // miner spawn point is not discovered at spawn, and the spawn should be
  // discovered at spawn. Still...
  if (plan.hops < neighborPlan.hops) {
    throw new Error("Infinite loop detected");
  }

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

function placeBreadcrumbVehicle(
  cavern: StrataformedCavern,
  plan: Plan,
  [x, y]: Point,
  vehicles: Vehicle[],
  vehicleFactory: VehicleFactory,
  rng: PseudorandomStream,
) {
  const tile = cavern.tiles.get(x, y);
  const fluid = tile === Tile.LAVA || tile === Tile.WATER ? tile : null;
  const template = rng.weightedChoice<VehicleTemplate | null>([
    { item: VehicleTemplate.HOVER_SCOUT, bid: fluid ? 0 : 2 },
    { item: VehicleTemplate.SMALL_DIGGER, bid: fluid ? 0 : 0.5 },
    { item: VehicleTemplate.SMALL_TRANSPORT_TRUCK, bid: fluid ? 0 : 0.75 },
    { item: VehicleTemplate.RAPID_RIDER, bid: fluid === Tile.WATER ? 1 : 0 },
    { item: VehicleTemplate.TUNNEL_SCOUT, bid: 0.25 },
    { item: null, bid: 0.0025 },
  ]);
  if (template) {
    vehicles.push(
      vehicleFactory.create({
        ...randomlyInTile({
          x,
          y,
          aimedAt: plan.path.baseplates[0].center,
          rng,
        }),
        template,
      }),
    );
  }
}

const pickMinerPoint = (
  plan: Plan,
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

const BASE: PartialArchitect<Metadata> = {
  ...DefaultCaveArchitect,
  prime: ({ cavern, plan }) => {
    const rng = cavern.dice.prime(plan.id);
    const minersCount = rng.betaInt({ a: 1, b: 2, min: 1, max: 5 });
    return { minersCount };
  },
  placeEntities: ({
    cavern,
    plan,
    miners,
    minerFactory,
    vehicles,
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
    for (let i = 0; i < plan.metadata.minersCount; i++) {
      miners.push(minerFactory.create({ ...randomlyInTile({ x, y, rng }) }));
    }
    // Place a breadcrumb vehicle
    const breadcrumbPoint = getBreadcrumbPoint(cavern, [x, y], dz, plan);
    placeBreadcrumbVehicle(
      cavern,
      plan,
      breadcrumbPoint,
      vehicles,
      vehicleFactory,
      rng,
    );
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
      variables: [{ condition: `${g.done}>0`, description }],
      sufficient: true,
    };
  },
  scriptGlobals({ cavern }) {
    const lostMiners = countLostMiners(cavern);
    return `# Lost Miners Globals
int ${g.lostMinersCount}=${lostMiners}
int ${g.done}=0
string ${g.messageFoundAll}="${escapeString(cavern.lore.generateFoundAllLostMiners(cavern.dice).text)}"
${g.onFoundAll}::;
msg:${g.messageFoundAll};
wait:3;
${g.done}=1;
`;
  },
  script({ cavern, plan }) {
    const lostMinersPoint = transformPoint(
      cavern,
      pickMinerPoint(plan, cavern)!,
    );
    const rng = cavern.dice.script(plan.id);
    const message = cavern.lore.generateFoundLostMiners(
      rng,
      plan.metadata.minersCount,
    ).text;
    const v = mkVars(`p${plan.id}FoundMiners`, [
      "messageDiscover",
      "onDiscover",
      "onIncomplete",
    ]);
    return `# Found Lost Miners ${plan.id}
string ${v.messageDiscover}="${escapeString(message)}"
if(change:${lostMinersPoint})[${v.onDiscover}]
${v.onDiscover}::;
pan:${lostMinersPoint};
${g.lostMinersCount}=${g.lostMinersCount}-${plan.metadata.minersCount};
((${g.lostMinersCount}>0))[${v.onIncomplete}][${g.onFoundAll}];

${v.onIncomplete}::;
msg:${v.messageDiscover};
`;
  },
  isLostMiners: true,
};

// The L.M.S. Explorer's teleporters just seem to be real lousy in ice
// caverns for some reason.
const MULTIPLIERS = { rock: 1.0, ice: 1.4, lava: 0.7 } as const;

const LOST_MINERS: readonly Architect<Metadata>[] = [
  {
    name: "Lost Miners",
    ...BASE,
    ...new RoughOyster(
      { of: Rough.ALWAYS_FLOOR, width: 2, grow: 2 },
      { of: Rough.ALWAYS_LOOSE_ROCK, grow: 1 },
      { of: Rough.HARD_ROCK, grow: 0.5 },
    ),
    caveBid: ({ cavern, hops, plans, plan }) =>
      !plan.fluid &&
      plan.pearlRadius > 2 &&
      plan.pearlRadius < 10 &&
      hops > 3 &&
      hops <= 8 &&
      isDeadEnd(plan) &&
      plans.reduce((r, p) => (p.architect?.isLostMiners ? r + 1 : r), 0) < 4 &&
      MULTIPLIERS[cavern.context.biome],
  },
];

export default LOST_MINERS;
