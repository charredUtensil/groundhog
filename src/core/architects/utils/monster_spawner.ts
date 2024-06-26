import { PseudorandomStream } from "../../common";
import { Point } from "../../common/geometry";
import { Architect } from "../../models/architect";
import { ROCK_MONSTER, monsterForBiome } from "../../models/creature";
import { Plan } from "../../models/plan";
import { FencedCavern } from "../../transformers/03_plastic/00_fence";
import { getDiscoveryPoint } from "./discovery";
import { eventChain, mkVars, scriptFragment, transformPoint } from "./script";

type MonsterSpawnerArgs = {
  initialCooldown?: { min: number; max: number };
  monster?: typeof ROCK_MONSTER;
  retriggerMode: RetriggerMode;
  spawnImmediatelyWhenReady?: boolean;
  spawnRateMultiplier?: number;
  waveSizeMultiplier?: number;
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

function getEmerges(plan: Plan, rng: PseudorandomStream) {
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
    const rng = cavern.dice.monsterSpawnScript(plan.id);

    const meanWaveSize = plan.monsterWaveSize * (args.waveSizeMultiplier ?? 1);
    const waveSize = rng.betaInt({
      a: 5,
      b: 2,
      min: 1,
      max: meanWaveSize * 1.25,
    });
    const delay = { min: 2 / waveSize, max: 15 / waveSize };

    const spawnRate = plan.monsterSpawnRate * (args.spawnRateMultiplier ?? 1);
    const meanCooldown = (60 * waveSize) / spawnRate;
    const cooldownOffset = meanCooldown / 4;
    const cooldown = {
      min: meanCooldown - cooldownOffset,
      max: meanCooldown + cooldownOffset,
    };

    const discoveryPoint = getDiscoveryPoint(cavern, plan);
    const emerges = getEmerges(plan, rng);
    const monster = args.monster || monsterForBiome(cavern.context.biome);
    const triggerPoints = getTriggerPoints(cavern, plan);

    const v = mkVars(`p${plan.id}MonsterSpawner`, [
      "state",
      "onActive",
      "doSpawn",
      "doRetrigger",
    ]);
    return scriptFragment(
      `# Spawn Monsters ${plan.id}`,
      `int ${v.state}=${STATE.INACTIVE}`,
      discoveryPoint
        ? /*
           * If there is a non-wall tile that starts undiscovered, generate an onActive
           * event chain that triggers when that tile changes (i.e. it becomes
           * discovered).
           */
          `if(change:${transformPoint(cavern, discoveryPoint)})[${v.onActive}]`
        : // Otherwise, just enable on init.
          `if(time:0)[${v.onActive}]`,
      eventChain(
        v.onActive,
        args.initialCooldown &&
          `wait:random(${args.initialCooldown.min.toFixed(2)})(${args.initialCooldown.max.toFixed(2)});`,
        `${v.state}=${STATE.READY};`,
        args.spawnImmediatelyWhenReady && `${v.doSpawn};`,
      ),
      ...triggerPoints.map(
        (point) => `when(enter:${transformPoint(cavern, point)})[${v.doSpawn}]`,
      ),
      eventChain(
        v.doSpawn,
        `((${v.state}<${STATE.READY}))return;`,
        `${v.state}=${RETRIGGER_MODES[args.retriggerMode].afterTriggerState};`,
        // Trigger all the monster spawns.
        ...Array.from(
          { length: waveSize },
          (_, i) => emerges[i % emerges.length],
        ).flatMap((emerge) => [
          `wait:random(${delay.min.toFixed(2)})(${delay.max.toFixed(2)});`,
          `emerge:${transformPoint(cavern, [emerge.x, emerge.y])},A,${monster.id},${emerge.radius};`,
        ]) as `${string};`[],
        // Wait for the cooldown and retrigger if retriggering is enabled.
        args.retriggerMode !== "never" &&
          `wait:random(${cooldown.min.toFixed(2)})(${cooldown.max.toFixed(2)});`,
        `((${v.state}>=${STATE.COOLDOWN}))[${v.state}=${STATE.READY}][${v.state}=${STATE.INACTIVE}];`,
      ),
      // Enable retriggering if a monster reaches the crystal hoard.
      ...(args.retriggerMode === "hoard"
        ? plan.innerPearl[0].map(
            (point) =>
              `when(enter:${transformPoint(cavern, point)},${monster.id})[${v.doRetrigger}]`,
            eventChain(
              v.doRetrigger,
              `((${v.state}==${STATE.RETRIGGERABLE}))${v.state}=${STATE.COOLDOWN};`,
            ),
          )
        : []),
    );
  };
}
