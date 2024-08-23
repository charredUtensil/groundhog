import { Architect, BaseMetadata } from "../models/architect";
import { DefaultHallArchitect, PartialArchitect } from "./default";
import { mkRough, Rough } from "./utils/rough";
import {
  escapeString,
  eventChain,
  mkVars,
  scriptFragment,
  transformPoint,
} from "./utils/script";
import { DiscoveredCavern } from "../transformers/03_plastic/01_discover";
import { Plan } from "../models/plan";
import { monsterSpawnScript } from "./utils/creature_spawners";
import { Hardness, Tile } from "../models/tiles";

// Fissure halls are not drillable, but suddenly crack open without any player
// involvement after being discovered.

const METADATA = { tag: "fissure" } as const satisfies BaseMetadata;

function getDiscoveryPoints(cavern: DiscoveredCavern, plan: Plan<any>) {
  const used: true[] = [];
  return plan.innerPearl[0].filter((pos) => {
    const dz = cavern.discoveryZones.get(...pos);
    if (!dz || dz.openOnSpawn || used[dz.id]) {
      return false;
    }
    used[dz.id] = true;
    return true;
  });
}

const sVars = (plan: Plan<any>) =>
  mkVars(`p${plan.id}Fissure`, [
    "onDiscover",
    `onTrip`,
    `msgForeshadow`,
    `spawn`,
    "tripCount",
  ]);

const BASE: PartialArchitect<typeof METADATA> = {
  ...DefaultHallArchitect,
  prime: () => METADATA,
  script: ({ cavern, plan }) => {
    const v = sVars(plan);
    const discoveryPoints = getDiscoveryPoints(cavern, plan);
    const panTo = plan.innerPearl[0][Math.floor(plan.innerPearl[0].length / 2)];
    const rng = cavern.dice.script(plan.id);

    const drillPoints = plan.innerPearl[0].filter((pos) => {
      const t = cavern.tiles.get(...pos) ?? Tile.SOLID_ROCK;
      return t.isWall && t.hardness < Hardness.SOLID;
    });
    const trips = Math.ceil((discoveryPoints.length + drillPoints.length) / 4);

    return scriptFragment(
      `# P${plan.id}: Fissure`,
      `int ${v.tripCount}=0`,
      `string ${v.msgForeshadow}="${escapeString(cavern.lore.generateSeismicForeshadow(rng).text)}"`,
      ...discoveryPoints.map(
        (pos) => `if(change:${transformPoint(cavern, pos)})[${v.onTrip}]`,
      ),
      ...drillPoints.map(
        (pos) => `if(drill:${transformPoint(cavern, pos)})[${v.onTrip}]`,
      ),
      eventChain(
        v.onTrip,
        `${v.tripCount}+=1;`,
        `((${v.tripCount}!=${trips}))return;`,
        `wait:random(5)(30);`,
        `shake:1;`,
        `msg:${v.msgForeshadow};`,
        `wait:random(30)(150);`,
        `shake:2;`,
        `pan:${transformPoint(cavern, panTo)};`,
        `wait:1;`,
        `shake:4;`,
        ...plan.innerPearl[0]
          .filter((pos) => cavern.tiles.get(...pos)?.isWall)
          .map(
            (pos) => `drill:${transformPoint(cavern, pos)};` satisfies `${string};`,
          ),
        cavern.context.hasMonsters && `${v.spawn};`,
      ),
    );
  },
  monsterSpawnScript: (args) => {
    const bps = args.plan.path.baseplates;
    const ebps = [bps[0], bps[bps.length - 1]];
    return monsterSpawnScript(args, {
      armEvent: sVars(args.plan).spawn,
      emerges: ebps.map((bp) => {
        const [x, y] = bp.center;
        return { x: Math.floor(x), y: Math.floor(y), radius: bp.pearlRadius };
      }),
      maxTriggerCount: 1,
      triggerOnFirstArmed: true,
    });
  },
};

const FISSURE = [
  {
    name: "Fissure Hall",
    ...BASE,
    ...mkRough({ of: Rough.SOLID_ROCK }, { of: Rough.VOID, grow: 1 }),
    hallBid: ({ plan, plans }) =>
      !plan.fluid &&
      plan.path.kind === "auxiliary" &&
      plan.path.exclusiveSnakeDistance > 1 &&
      !plan.intersects.some((_, i) => plans[i].metadata?.tag === "fissure") &&
      1,
  },
] as const satisfies readonly Architect<typeof METADATA>[];

export default FISSURE;
