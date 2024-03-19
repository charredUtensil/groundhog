import { Point } from "../../common/geometry";
import { Architect } from "../../models/architect";
import { ROCK_MONSTER } from "../../models/creature";
import { Plan } from "../../models/plan";
import { FencedCavern } from "../../transformers/02_plastic/07_fence";
import { mkVars, transformPoint } from "./script";

type MonsterSpawnerArgs = {
  delay: { min: number; max: number };
  cooldown: { min: number; max: number };
  initialCooldown?: { min: number; max: number };
  monster: typeof ROCK_MONSTER;
  retriggerMode: RetriggerMode;
  spawnImmediatelyWhenReady?: boolean;
  waveSize: number;
};

const STATE = {
  INACTIVE: 0,
  RETRIGGERABLE: 1,
  COOLDOWN: 2,
  READY: 3,
} as const;

const RETRIGGER_MODES = {
  never: { afterTriggerState: STATE.INACTIVE },
  hoard: { afterTriggerState: STATE.RETRIGGERABLE },
  automatic: { afterTriggerState: STATE.COOLDOWN },
} as const;

export type RetriggerMode = keyof typeof RETRIGGER_MODES;

function getDiscoveryPoint(
  cavern: FencedCavern,
  plan: Plan,
): Point | undefined {
  for (let i = 0; i < plan.innerPearl.length; i++) {
    const layer = plan.innerPearl[i];
    for (let j = 0; j < layer.length; j++) {
      const point = layer[j];
      const dz = cavern.discoveryZones.get(...point);
      if (dz) {
        return dz.openOnSpawn ? undefined : point;
      }
    }
  }
}

function getEmerges(cavern: FencedCavern, plan: Plan) {
  const rng = cavern.dice.monsterSpawnScript(plan.id);
  return rng.shuffle(
    plan.path.baseplates.map((bp) => {
      const [x, y] = bp.center;
      return { x: Math.floor(x), y: Math.floor(y), radius: bp.pearlRadius };
    }),
  );
}

function getTriggerPoints(cavern: FencedCavern, plan: Plan): Point[] {
  // Pick any tile that was set with a value, even if it is solid rock.
  return plan.outerPearl[0].filter((point) => cavern.tiles.get(...point));
}

export function getMonsterSpawner(
  args: MonsterSpawnerArgs,
): Architect<unknown>["monsterSpawnScript"] {
  return function ({ cavern, plan }) {
    const discoveryPoint = getDiscoveryPoint(cavern, plan);
    const emerges = getEmerges(cavern, plan);
    const triggerPoints = getTriggerPoints(cavern, plan);
    const v = mkVars(`p${plan.id}MonsterSpawner`, [
      "state",
      "onActive",
      "doSpawn",
      "doRetrigger",
    ]);
    return `# Spawn Monsters ${plan.id}

int ${v.state}=${STATE.INACTIVE}
${
  discoveryPoint
    ? /*
       * If there is a non-wall tile that starts undiscovered, generate an onActive
       * event chain that triggers when that tile changes (i.e. it becomes
       * discovered).
       */
      `if(change:${transformPoint(cavern, discoveryPoint)})[${v.onActive}]`
    : // Otherwise, just enable on init.
      `if(time:0)[${v.onActive}]`
}
${v.onActive}::;
${
  // If there is an initial cooldown, wait for it.
  args.initialCooldown
    ? `wait:random(${args.initialCooldown.min.toFixed(2)})(${args.initialCooldown.max.toFixed(2)});`
    : ""
}
${v.state}=${STATE.READY};
${args.spawnImmediatelyWhenReady ? `${v.doSpawn};` : ""}

${triggerPoints
  .map((point) => `when(enter:${transformPoint(cavern, point)})[${v.doSpawn}]`)
  .join("\n")}
${v.doSpawn}::;
((${v.state}<${STATE.READY}))return;
${v.state}=${RETRIGGER_MODES[args.retriggerMode].afterTriggerState};
${
  // Trigger all the monster spawns.
  (() => {
    const r: string[] = [];
    for (let i = 0; i < args.waveSize; i++) {
      const emerge = emerges[i % emerges.length];
      r.push(`wait:random(${args.delay.min.toFixed(2)})(${args.delay.max.toFixed(2)});
emerge:${transformPoint(cavern, [emerge.x, emerge.y])},A,${args.monster.id},${emerge.radius};`);
    }
    return r.join("\n");
  })()
}
${
  // Wait for the cooldown and retrigger if retriggering is enabled.
  args.retriggerMode === "never"
    ? ""
    : `wait:random(${args.cooldown.min.toFixed(2)})(${args.cooldown.max.toFixed(2)});
((${v.state}>=${STATE.COOLDOWN}))[${v.state}=${STATE.READY}][${v.state}=${STATE.INACTIVE}];`
}

${(() => {
  // Enable retriggering if a monster reaches the crystal hoard.
  if (args.retriggerMode !== "hoard") {
    return "";
  }
  const triggers = plan.innerPearl[0].map(
    (point) =>
      `when(enter:${transformPoint(cavern, point)},${args.monster.id})[${v.doRetrigger}]`,
  );
  return `${triggers.join("\n")}
${v.doRetrigger}::;
((${v.state}==${STATE.RETRIGGERABLE}))${v.state}=${STATE.COOLDOWN};
`;
})()}`;
  };
}
