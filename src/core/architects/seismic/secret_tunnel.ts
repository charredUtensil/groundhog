import { Architect } from "../../models/architect";
import { DefaultHallArchitect, PartialArchitect } from "../default";
import { mkRough, Rough } from "../utils/rough";
import { EventChainLine, mkVars, transformPoint } from "../utils/script";
import { DiscoveredCavern } from "../../transformers/03_plastic/01_discover";
import { Plan } from "../../models/plan";
import { monsterSpawnScript } from "../utils/creature_spawners";
import { Hardness, Tile } from "../../models/tiles";
import { SEISMIC_BASE, gSeismic, METADATA } from "./base";

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
  mkVars(`p${plan.id}SSeTu`, [`onTrip`, `doSpawn`, "tripCount"]);

const BASE: PartialArchitect<typeof METADATA> = {
  ...DefaultHallArchitect,
  ...SEISMIC_BASE,
  script: ({ cavern, plan, sb }) => {
    const v = sVars(plan);
    const discoveryPoints = getDiscoveryPoints(cavern, plan);
    const panTo = plan.innerPearl[0][Math.floor(plan.innerPearl[0].length / 2)];

    const drillPoints = plan.innerPearl[0].filter((pos) => {
      const t = cavern.tiles.get(...pos) ?? Tile.SOLID_ROCK;
      return t.isWall && t.hardness < Hardness.SOLID;
    });
    const trips = Math.ceil((discoveryPoints.length + drillPoints.length) / 4);

    sb.declareInt(v.tripCount, 0);
    discoveryPoints.forEach((pos) =>
      sb.if(`change:${transformPoint(cavern, pos)}`, `${v.tripCount}+=1;`),
    );
    drillPoints.map((pos) =>
      sb.if(`drill:${transformPoint(cavern, pos)}`, `${v.tripCount}+=1;`),
    );
    sb.if(
      `${v.tripCount}>=${trips}`,
      `wait:random(5)(30);`,
      `shake:1;`,
      `${gSeismic.showMessage}+=1;`,
      `wait:random(30)(150);`,
      `shake:2;`,
      `pan:${transformPoint(cavern, panTo)};`,
      `wait:1;`,
      `shake:4;`,
      ...plan.innerPearl[0]
        .filter((pos) => cavern.tiles.get(...pos)?.isWall)
        .map(
          (pos) =>
            `drill:${transformPoint(cavern, pos)};` satisfies EventChainLine,
        ),
      cavern.context.hasMonsters && `${v.doSpawn};`,
    );
  },
  monsterSpawnScript: (args) => {
    const bps = args.plan.path.baseplates;
    const ebps = [bps[0], bps[bps.length - 1]];
    return monsterSpawnScript(args, {
      reArmMode: "none",
      armEvent: sVars(args.plan).doSpawn,
      tripOnArmed: "first",
      tripPoints: [],
      emerges: ebps.map((bp) => {
        const [x, y] = bp.center;
        return { x: Math.floor(x), y: Math.floor(y), radius: bp.pearlRadius };
      }),
    });
  },
};

const SECRET_TUNNEL = [
  {
    name: "Seismic.SecretTunnel",
    ...BASE,
    ...mkRough({ of: Rough.SOLID_ROCK }, { of: Rough.VOID, grow: 1 }),
    hallBid: ({ cavern, plan, plans }) =>
      !plan.fluid &&
      plan.path.kind === "auxiliary" &&
      plan.path.exclusiveSnakeDistance > 1 &&
      !plan.intersects.some((_, i) =>
        ["seismic", "pandora"].includes(plans[i].metadata?.tag ?? ""),
      ) &&
      cavern.context.planWhimsy * 0.75,
  },
] as const satisfies readonly Architect<typeof METADATA>[];

export default SECRET_TUNNEL;
