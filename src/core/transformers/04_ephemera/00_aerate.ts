import { NSEW, Point } from "../../common/geometry";
import { Grid, MutableGrid } from "../../common/grid";
import {
  POWER_STATION,
  SUPPORT_STATION,
  TELEPORT_PAD,
  TOOL_STORE,
} from "../../models/building";
import { EntityPosition } from "../../models/position";
import { Hardness, Tile } from "../../models/tiles";
import { PopulatedCavern } from "../03_plastic/05_populate";

export type AeratedCavern = PopulatedCavern & {
  readonly oxygen: null | readonly [number, number];
  readonly aerationLog: null | Grid<true>;
};

const MIN_STARTING_AIR = 1000;
const MIN_AIR_CAP = 3000;
const FALLBACK_AIR = 8000;
const AIR_STEP = 250;

// Some timing stats
const TIMING = {
  // Time required to walk across 1 tile.
  WALK: 1,
  WALK_ENCUMBERED: 1.6,
  // WALK_RUBBLE: 2.6,
  // WALK_RUBBLE_ENCUMBERED: 3.8,
  DRILL_DIRT: 4,
  DRILL_LOOSE_ROCK: 8,
  DRILL_SEAM: 25,
  CLEAR_RUBBLE: 10,
  // Dynamite is fast but requires an encumbered journey.
  DYNAMITE: 6,
  // Time to kill monsters
  KILL_MONSTER: 20,
  // Time to build each of these assuming resources were already collected.
  BUILD_POWER_PATH: 15,
  BUILD_TELEPORT_PAD: 125,
  BUILD_POWER_STATION: 210,
  BUILD_SUPPORT_STATION: 215,
} as const satisfies { [key: string]: number };

function getOrigin(cavern: PopulatedCavern): Point {
  const entities = [
    ...cavern.buildings.filter((b) => b.template === TOOL_STORE),
    ...cavern.buildings,
    ...cavern.miners,
    ...cavern.vehicles,
  ];
  for (const e of entities) {
    const pos = [Math.floor(e.x), Math.floor(e.y)] as Point;
    if (cavern.discoveryZones.get(...pos)?.openOnSpawn) {
      return pos;
    }
  }
  throw new Error("No discovered entities. Is this level even playable?");
}

export default function aerate(cavern: PopulatedCavern): AeratedCavern {
  if (cavern.oxygen !== undefined) {
    return { ...cavern, oxygen: cavern.oxygen, aerationLog: null };
  }
  if (!cavern.context.hasAirLimit) {
    return { ...cavern, oxygen: null, aerationLog: null };
  }

  const presentAtSpawn = (e: EntityPosition) =>
    cavern.discoveryZones.get(Math.floor(e.x), Math.floor(e.y))?.openOnSpawn;

  const buildings = cavern.buildings.filter(presentAtSpawn);
  const vehicles = cavern.vehicles.filter(presentAtSpawn);

  let hasTeleportPad = false;
  let hasPowerStation = false;
  let hasSupportStation = false;

  let air = 0;
  let ore = 0;
  let crystals = 0;

  const aerationLog = new MutableGrid<true>();

  buildings.forEach((b) => {
    hasTeleportPad ||= b.template === TELEPORT_PAD;
    hasPowerStation ||= b.template === POWER_STATION;
    hasSupportStation ||= b.template === SUPPORT_STATION;
    // Any building can be scrapped for crystals.
    crystals += b.template.crystals;
  });
  vehicles.forEach((v) => {
    // Any vehicle can be scrapped for crystals.
    crystals += v.template.crystals;
  });

  // Assume the player has to build 2 power paths.
  air += 2 * TIMING.BUILD_POWER_PATH;
  ore -= 4;

  // The player needs crystals to build the power and support stations plus
  // one extra for power.
  crystals -= POWER_STATION.crystals + SUPPORT_STATION.crystals + 1;

  // The player must build these buildings if not built, and needs ore for them.
  if (!hasTeleportPad) {
    air += TIMING.BUILD_TELEPORT_PAD;
    ore -= 5 + TELEPORT_PAD.ore;
  }
  if (!hasPowerStation) {
    air += TIMING.BUILD_POWER_STATION;
    ore -= 5 + POWER_STATION.ore;
  }
  if (!hasSupportStation) {
    air += TIMING.BUILD_SUPPORT_STATION;
    ore -= 5 + SUPPORT_STATION.ore;
  }

  crystals = Math.min(crystals, -1);

  const origin = getOrigin(cavern);

  function drillTiming(t: Tile) {
    switch (t.hardness) {
      case Hardness.DIRT:
        return TIMING.DRILL_DIRT;
      case Hardness.LOOSE:
        return TIMING.DRILL_LOOSE_ROCK;
      case Hardness.SEAM:
        return TIMING.DRILL_SEAM;
      default:
        return undefined;
    }
  }

  {
    const distance = new MutableGrid<number>();
    distance.set(...origin, 0);

    const walkQueue: Point[] = [origin];
    const drillQueue: Point[] = [];
    const dynamiteQueue: Point[] = [];

    function enqueue(x: number, y: number, d: number) {
      if (distance.get(x, y) === undefined) {
        distance.set(x, y, d);
        const t = cavern.tiles.get(x, y);
        if (t && !t.isFluid) {
          if (!t.isWall) {
            walkQueue.push([x, y]);
          } else if (drillTiming(t)) {
            drillQueue.push([x, y]);
          } else if (t.hardness === Hardness.HARD) {
            dynamiteQueue.push([x, y]);
          }
        }
      }
    }

    while (ore < 0 || crystals < 0) {
      if (walkQueue.length) {
        const [x, y] = walkQueue.shift()!;
        aerationLog.set(x, y, true);
        const d = distance.get(x, y)!;

        NSEW.forEach(([ox, oy]) => enqueue(x + ox, y + oy, d + 1));
      } else if (drillQueue.length || dynamiteQueue.length) {
        const useDynamite = !drillQueue.length;
        const [x, y] = (useDynamite ? dynamiteQueue : drillQueue).shift()!;
        aerationLog.set(x, y, true);
        const d = distance.get(x, y)!;
        const t = cavern.tiles.get(x, y)!;
        if (useDynamite) {
          // Add the time to walk back and carry dynamite there, and run away
          // while the wall explodes.
          air += d * (TIMING.WALK + TIMING.WALK_ENCUMBERED) + TIMING.DYNAMITE;
        } else {
          // Add the time to drill the wall.
          air += drillTiming(t)!;
        }
        if (ore < 0) {
          const oreYield = t.oreYield + (cavern.ore.get(x, y) ?? 0);
          ore += oreYield;
          air +=
            oreYield * d * (TIMING.WALK + TIMING.WALK_ENCUMBERED) +
            TIMING.CLEAR_RUBBLE;
        }
        if (crystals < 0) {
          const crystalYield =
            t.crystalYield + (cavern.crystals.get(x, y) ?? 0);
          crystals += crystalYield;
          air += crystalYield * d * (TIMING.WALK + TIMING.WALK_ENCUMBERED);
        }
        // If the wall doesn't have any useful resources, don't count the time to walk
        // to it. That will be counted when walls behind it get drilled.

        // The wall is now floor, so make it floor.
        walkQueue.push([x, y]);
      } else {
        // Failure mode: This simulation can't figure out how to build a
        // Support Station. Use an arbitrary high air quantity.
        console.warn("Unable to playtest this level for air consumption.");
        return { ...cavern, oxygen: [FALLBACK_AIR, FALLBACK_AIR], aerationLog };
      }
    }
  }

  const spawn = cavern.plans.find((plan) => !plan.hops.length)!;

  if (cavern.context.hasMonsters) {
    air += ((TIMING.KILL_MONSTER * spawn.monsterSpawnRate) / 60) * (air / 5);
  }

  // Multiply by safety factor and round up to the nearest 250.
  air *= cavern.context.airSafetyFactor;
  air = Math.max(MIN_STARTING_AIR, Math.ceil(air / AIR_STEP) * AIR_STEP);

  // Larger caverns should have more max air, even if the starting air is low.
  const maxAir = Math.max(
    air,
    MIN_AIR_CAP,
    Math.ceil((cavern.context.targetSize * 80) / AIR_STEP) * AIR_STEP,
  );

  return { ...cavern, oxygen: [air, maxAir], aerationLog };
}
