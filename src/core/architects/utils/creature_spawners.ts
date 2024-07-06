import { PseudorandomStream } from "../../common";
import { Point } from "../../common/geometry";
import {
  CreatureTemplate,
  SLIMY_SLUG,
  monsterForBiome,
} from "../../models/creature";
import { Plan } from "../../models/plan";
import { FencedCavern } from "../../transformers/03_plastic/00_fence";
import { EnscribedCavern } from "../../transformers/04_ephemera/01_enscribe";
import { getDiscoveryPoint } from "./discovery";
import { eventChain, mkVars, scriptFragment, transformPoint } from "./script";

type CreatureSpawnerArgs = {
  creature: CreatureTemplate;
  emerges?: readonly Emerge[];
  initialCooldown?: { min: number; max: number };
  maxTriggerCount?: number;
  meanWaveSize?: number;
  needCrystals?: { base: number; increment?: number };
  retriggerMode: RetriggerMode;
  rng: PseudorandomStream;
  spawnRate?: number;
  triggerOnFirstArmed: boolean;
  triggerPoints?: readonly Point[];
  waveSize?: number;
};

const STATE = {
  EXHAUSTED: 0,
  UNDISCOVERED: 1,
  AWAITING_REARM: 2,
  COOLDOWN: 3,
  ARMED: 4,
} as const;

const RETRIGGER_MODES = {
  automatic: { afterTriggerState: STATE.COOLDOWN },
  hoard: { afterTriggerState: STATE.AWAITING_REARM },
} as const;

export type RetriggerMode = keyof typeof RETRIGGER_MODES;

type Emerge = {
  readonly x: number;
  readonly y: number;
  readonly radius: number;
};

function getEmerges(plan: Plan): Emerge[] {
  return plan.path.baseplates.map((bp) => {
    const [x, y] = bp.center;
    return { x: Math.floor(x), y: Math.floor(y), radius: bp.pearlRadius };
  });
}

function cycleEmerges(
  emerges: readonly Emerge[],
  rng: PseudorandomStream,
  waveSize: number,
) {
  const result: Emerge[] = [];
  while (result.length < waveSize) {
    result.push(...rng.shuffle(emerges));
  }
  result.length = waveSize;
  return result;
}

function getTriggerPoints(cavern: FencedCavern, plan: Plan): Point[] {
  // Pick any tile that was set with a value, even if it is solid rock.
  return plan.outerPearl[0].filter((point) => cavern.tiles.get(...point));
}

export function monsterSpawnScript(
  args: { cavern: EnscribedCavern; plan: Plan },
  opts?: Partial<CreatureSpawnerArgs>,
) {
  return creatureSpawnScript(args, {
    creature: monsterForBiome(args.cavern.context.biome),
    retriggerMode: "automatic",
    rng: args.cavern.dice.monsterSpawnScript(args.plan.id),
    triggerOnFirstArmed: false,
    ...opts,
  });
}

export function slugSpawnScript(
  args: { cavern: EnscribedCavern; plan: Plan },
  opts?: Partial<CreatureSpawnerArgs>,
) {
  return creatureSpawnScript(args, {
    creature: SLIMY_SLUG,
    needCrystals: { base: 1 },
    retriggerMode: "automatic",
    rng: args.cavern.dice.slugSpawnScript(args.plan.id),
    triggerOnFirstArmed: false,
    ...opts,
  });
}

function creatureSpawnScript(
  { cavern, plan }: { cavern: EnscribedCavern; plan: Plan },
  opts: CreatureSpawnerArgs,
) {
  const waveSize =
    opts.waveSize ??
    opts.rng.betaInt({
      a: 5,
      b: 2,
      min: 1,
      max: (opts.meanWaveSize ?? plan.monsterWaveSize) * 1.25,
    });
  const delay = { min: 2 / waveSize, max: 15 / waveSize };

  const spawnRate = opts.spawnRate ?? plan.monsterSpawnRate;
  const meanCooldown = (60 * waveSize) / spawnRate;
  const cooldownOffset = meanCooldown / 4;
  const cooldown = {
    min: meanCooldown - cooldownOffset,
    max: meanCooldown + cooldownOffset,
  };

  const discoveryPoint = getDiscoveryPoint(cavern, plan);
  const emerges = cycleEmerges(
    opts.emerges ?? getEmerges(plan),
    opts.rng,
    waveSize,
  );
  const triggerPoints = opts.triggerPoints ?? getTriggerPoints(cavern, plan);

  const v = mkVars(`p${plan.id}${opts.creature.inspectAbbrev}Spawner`, [
    "needCrystals",
    "state",
    "triggerCount",
    "onDiscovered",
    "doSpawn",
    "doRetrigger",
  ]);
  return scriptFragment(
    `# Spawn ${opts.creature.id} x${waveSize} ${plan.id}`,

    // Declare variables
    `int ${v.state}=${STATE.UNDISCOVERED}`,
    opts.maxTriggerCount !== undefined && `int ${v.triggerCount}=0`,
    opts.needCrystals?.increment !== undefined &&
      `int ${v.needCrystals}=${opts.needCrystals.base}`,

    // Discovery
    discoveryPoint
      ? /*
         * If there is a non-wall tile that starts undiscovered, generate an onDiscovered
         * event chain that triggers when that tile changes (i.e. it becomes
         * discovered).
         */
        `if(change:${transformPoint(cavern, discoveryPoint)})[${v.onDiscovered}]`
      : // Otherwise, just enable on init.
        `if(time:0)[${v.onDiscovered}]`,
    eventChain(
      v.onDiscovered,
      opts.initialCooldown &&
        `wait:random(${opts.initialCooldown.min.toFixed(2)})(${opts.initialCooldown.max.toFixed(2)});`,
      `${v.state}=${STATE.ARMED};`,
      opts.triggerOnFirstArmed && `${v.doSpawn};`,
    ),

    // Trigger points
    ...triggerPoints.map(
      (point) => `when(enter:${transformPoint(cavern, point)})[${v.doSpawn}]`,
    ),

    // Do the actual spawning
    eventChain(
      v.doSpawn,

      // Check conditions to reject.
      `((${v.state}<${STATE.ARMED}))return;`,
      opts.needCrystals &&
        `((crystals<${opts.needCrystals.increment ? v.needCrystals : opts.needCrystals.base}))return;`,

      // Update variables before triggering.
      `${v.state}=${RETRIGGER_MODES[opts.retriggerMode].afterTriggerState};`,
      opts.maxTriggerCount !== undefined && `${v.triggerCount}+=1;`,
      opts.needCrystals?.increment !== undefined &&
        `${v.needCrystals}=crystals+${opts.needCrystals.increment};`,

      // Trigger all the spawns.
      ...(emerges.flatMap((emerge) => [
        `wait:random(${delay.min.toFixed(2)})(${delay.max.toFixed(2)});`,
        `emerge:${transformPoint(cavern, [emerge.x, emerge.y])},A,${opts.creature.id},${emerge.radius};`,
      ]) as `${string};`[]),

      // Update the counter.
      opts.maxTriggerCount !== undefined &&
        `((${v.triggerCount}>=${opts.maxTriggerCount}))${v.state}=${STATE.EXHAUSTED};`,
      // Wait for the cooldown period.
      `wait:random(${cooldown.min.toFixed(2)})(${cooldown.max.toFixed(2)});`,
      // Re-arm if in cooldown.
      `((${v.state}>=${STATE.COOLDOWN}))[${v.state}=${STATE.ARMED}][${v.state}=${STATE.EXHAUSTED}];`,
    ),

    // Hoard mode must be "manually" re-armed by a monster visiting the hoard
    // within cooldown.
    ...(opts.retriggerMode === "hoard"
      ? plan.innerPearl[0].map(
          (point) =>
            `when(enter:${transformPoint(cavern, point)},${opts.creature.id})[${v.doRetrigger}]`,
          eventChain(
            v.doRetrigger,
            `((${v.state}==${STATE.AWAITING_REARM}))${v.state}=${STATE.COOLDOWN};`,
          ),
        )
      : []),
  );
}
