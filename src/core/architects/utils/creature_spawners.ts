import { PseudorandomStream } from "../../common";
import { Point } from "../../common/geometry";
import {
  CreatureTemplate,
  SLIMY_SLUG,
  monsterForBiome,
} from "../../models/creature";
import { Plan } from "../../models/plan";
import { EnscribedCavern } from "../../transformers/04_ephemera/02_enscribe";
import { getDiscoveryPoint } from "./discovery";
import { eventChain, mkVars, scriptFragment, transformPoint } from "./script";

type CreatureSpawnerArgs = {
  readonly armEvent?: string;
  readonly creature: CreatureTemplate;
  readonly emerges?: readonly Emerge[];
  readonly initialCooldown?: { min: number; max: number };
  readonly maxTriggerCount?: number;
  readonly meanWaveSize?: number;
  readonly needCrystals?: { base: number; increment?: number };
  readonly retriggerMode: RetriggerMode;
  readonly rng: PseudorandomStream;
  readonly spawnRate?: number;
  readonly triggerOnFirstArmed: boolean;
  readonly triggerPoints?: readonly Point[];
  readonly waveSize?: number;
};

const STATE = {
  /** This spawner is deactivated and can't be reactivated. */
  EXHAUSTED: 0,
  /** This spawner has not been activated yet. */
  INITIAL: 1,
  /** This spawner is waiting to be reactivated by some trigger. */
  AWAITING_REARM: 2,
  /** This spawner just activated and is waiting for time to pass. */
  COOLDOWN: 3,
  /** This spawner is ready to activate. */
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

function getEmerges(plan: Plan<any>): Emerge[] {
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

function getArmTriggers(
  cavern: EnscribedCavern,
  plan: Plan<any>,
  armFn: string,
) {
  const discoveryPoint = getDiscoveryPoint(cavern, plan);
  if (discoveryPoint) {
    // There is a non-wall tile that starts undiscovered.
    // Enable when it is discovered.
    return [`if(change:${transformPoint(cavern, discoveryPoint)})[${armFn}]`];
  }
  // Just enable on init.
  return [`if(time:0)[${armFn}]`];
}

function getTriggerPoints(cavern: EnscribedCavern, plan: Plan<any>): Point[] {
  // Pick any tile that was set with a value, even if it is solid rock.
  return plan.outerPearl[0].filter((point) => cavern.tiles.get(...point));
}

export function monsterSpawnScript(
  args: { cavern: EnscribedCavern; plan: Plan<any> },
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
  args: { cavern: EnscribedCavern; plan: Plan<any> },
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
  { cavern, plan }: { cavern: EnscribedCavern; plan: Plan<any> },
  opts: CreatureSpawnerArgs,
) {
  const v = mkVars(`p${plan.id}${opts.creature.inspectAbbrev}Sp`, [
    "doArm",
    "doRetrigger",
    "doSpawn",
    "needCrystals",
    "state",
    "triggerCount",
  ]);

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

  const armEvent = opts.armEvent ?? v.doArm;
  const armTriggers = opts.armEvent
    ? []
    : getArmTriggers(cavern, plan, armEvent);
  const cooldownOffset = meanCooldown / 4;
  const cooldown = {
    min: meanCooldown - cooldownOffset,
    max: meanCooldown + cooldownOffset,
  };
  const emerges = cycleEmerges(
    opts.emerges ?? getEmerges(plan),
    opts.rng,
    waveSize,
  );
  const once = opts.maxTriggerCount === 1;
  const triggerPoints = opts.triggerPoints ?? getTriggerPoints(cavern, plan);

  const needCountTriggerEvents = !once && opts.maxTriggerCount !== undefined;
  const needTriggerPoints = !(once && opts.triggerOnFirstArmed);

  return scriptFragment(
    `# P${plan.id}: Spawn ${opts.creature.name} x${waveSize}`,

    // Declare variables
    `int ${v.state}=${STATE.INITIAL}`,
    needCountTriggerEvents && `int ${v.triggerCount}=0`,
    opts.needCrystals?.increment !== undefined &&
      `int ${v.needCrystals}=${opts.needCrystals.base}`,

    // Enable
    ...armTriggers,
    eventChain(
      armEvent,
      opts.initialCooldown &&
        `wait:random(${opts.initialCooldown.min.toFixed(2)})(${opts.initialCooldown.max.toFixed(2)});`,
      armTriggers.length !== 1 && `((${v.state}>${STATE.INITIAL}))return;`,
      `${v.state}=${STATE.ARMED};`,
      opts.triggerOnFirstArmed && `${v.doSpawn};`,
    ),

    // Do the actual spawning.
    ...(needTriggerPoints
      ? triggerPoints.map(
          (point) =>
            `when(enter:${transformPoint(cavern, point)})[${v.doSpawn}]`,
        )
      : []),
    eventChain(
      v.doSpawn,

      // Check conditions to reject.
      `((${v.state}<${STATE.ARMED}))return;`,
      opts.needCrystals &&
        `((crystals<${opts.needCrystals.increment ? v.needCrystals : opts.needCrystals.base}))return;`,

      // Update variables before triggering.
      `${v.state}=${RETRIGGER_MODES[opts.retriggerMode].afterTriggerState};`,
      needCountTriggerEvents && `${v.triggerCount}+=1;`,
      opts.needCrystals?.increment !== undefined &&
        `${v.needCrystals}=crystals+${opts.needCrystals.increment};`,

      // Trigger all the spawns.
      ...(emerges.flatMap((emerge) => [
        `wait:random(${delay.min.toFixed(2)})(${delay.max.toFixed(2)});`,
        `emerge:${transformPoint(cavern, [emerge.x, emerge.y])},A,${opts.creature.id},${emerge.radius};`,
      ]) as `${string};`[]),

      // Update the counter.
      once
        ? `${v.state}=${STATE.EXHAUSTED};`
        : opts.maxTriggerCount !== undefined &&
            `((${v.triggerCount}>=${opts.maxTriggerCount}))${v.state}=${STATE.EXHAUSTED};`,
      // Wait for the cooldown period.
      !once &&
        `wait:random(${cooldown.min.toFixed(2)})(${cooldown.max.toFixed(2)});`,
      // Re-arm if in cooldown.
      !once &&
        `((${v.state}>=${STATE.COOLDOWN}))[${v.state}=${STATE.ARMED}][${v.state}=${STATE.EXHAUSTED}];`,
    ),

    // Hoard mode must be "manually" re-armed by a monster visiting the hoard
    // within cooldown.
    ...(!once && opts.retriggerMode === "hoard"
      ? [
          ...plan.innerPearl[0].map(
            (point) =>
              `when(enter:${transformPoint(cavern, point)},${opts.creature.id})[${v.doRetrigger}]`,
          ),
          eventChain(
            v.doRetrigger,
            `((${v.state}==${STATE.AWAITING_REARM}))${v.state}=${STATE.COOLDOWN};`,
          ),
        ]
      : []),
  );
}
