import { PseudorandomStream } from "../../common";
import { Point } from "../../common/geometry";
import { filterTruthy } from "../../common/utils";
import { Architect } from "../../models/architect";
import {
  CreatureTemplate,
  SLIMY_SLUG,
  monsterForBiome,
} from "../../models/creature";
import { Plan } from "../../models/plan";
import { PreprogrammedCavern } from "../../transformers/04_ephemera/03_preprogram";
import { getDiscoveryPoint } from "./discovery";
import {
  eventChain,
  EventChainLine,
  mkVars,
  scriptFragment,
  ScriptHelper,
  transformPoint,
} from "./script";

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

export type RetriggerMode = "automatic" | "hoard";

type Emerge = {
  readonly x: number;
  readonly y: number;
  readonly radius: number;
};

const g = mkVars("gCreatures", ["globalCooldown"]);

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
  cavern: PreprogrammedCavern,
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

function getTriggerPoints(
  cavern: PreprogrammedCavern,
  plan: Plan<any>,
): Point[] {
  // Pick any tile that was set with a value, even if it is solid rock.
  return plan.outerPearl[0].filter((point) => cavern.tiles.get(...point));
}

export function creatureSpawnGlobals({
  cavern: { context },
  sh,
}: {
  cavern: PreprogrammedCavern;
  sh: ScriptHelper;
}) {
  if (
    !(context.hasMonsters || context.hasSlugs) ||
    context.globalHostilesCooldown <= 0
  ) {
    return undefined;
  }
  return scriptFragment(
    "# Globals: Creatures",
    sh.declareInt(g.globalCooldown, 0),
    sh.trigger(
      `when(${g.globalCooldown}==1)`,
      `wait:${context.globalHostilesCooldown};`,
      `${g.globalCooldown}=0;`,
    ),
  );
}

type ScriptArgs = Parameters<NonNullable<Architect<any>["script"]>>[0];

export function monsterSpawnScript(
  args: ScriptArgs,
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
  args: ScriptArgs,
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
  { cavern, plan, sh }: ScriptArgs,
  opts: CreatureSpawnerArgs,
) {
  const v = mkVars(`p${plan.id}${opts.creature.inspectAbbrev}Sp`, [
    "doArm",
    "needCrystals",
    "trip",
    "retrip",
    "hold",
    "firedCount",
  ]);

  const waveSize = Math.min(
    opts.waveSize ??
      opts.rng.betaInt({
        a: 5,
        b: 2,
        min: 1,
        max: (opts.meanWaveSize ?? plan.monsterWaveSize) * 1.25,
      }),
    cavern.context.globalHostilesCap > 0
      ? cavern.context.globalHostilesCap
      : Infinity,
  );
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

  const needTriggerPoints = !(once && opts.triggerOnFirstArmed);

  return scriptFragment(
    `# P${plan.id}: Spawn ${opts.creature.name}`,
    filterTruthy([
      `# x${waveSize}`,
      once ? "once" : `/${meanCooldown.toFixed()}s`,
      !once &&
        !!opts.needCrystals?.increment &&
        `/${opts.needCrystals.increment}EC`,
    ]).join(" "),

    // Declare variables
    sh.declareInt(v.trip, 2),
    sh.declareInt(v.hold, 0),
    sh.declareInt(v.firedCount, 0),
    !!opts.needCrystals?.increment &&
      sh.declareInt(v.needCrystals, opts.needCrystals.base),

    // Enable
    ...armTriggers,
    eventChain(
      armEvent,
      opts.initialCooldown &&
        `wait:random(${opts.initialCooldown.min.toFixed(2)})(${opts.initialCooldown.max.toFixed(2)});`,
      (() => {
        const set = `${v.trip}=${opts.triggerOnFirstArmed ? 1 : 0}`;
        return armTriggers.length > 1
          ? `((${v.firedCount}==0))[return][${set}];`
          : `${set};`;
      })(),
    ),

    // Do the actual spawning.
    ...(needTriggerPoints
      ? triggerPoints.map(
          (point) =>
            `when(enter:${transformPoint(cavern, point)})[${v.trip}+=1]`,
        )
      : []),

    // Hoard mode must be "manually" re-armed by a monster visiting the hoard
    // within cooldown.
    !once &&
      opts.retriggerMode === "hoard" &&
      scriptFragment(
        sh.declareInt(v.retrip, 0),
        ...plan.innerPearl[0].map(
          (point) =>
            `when(enter:${transformPoint(cavern, point)},${opts.creature.id})[${v.retrip}+=1]`,
        ),
      ),

    sh.trigger(
      `when(${v.trip}==1)`,
      `${v.hold}=0;`,

      // First check things that are partial blockers
      cavern.context.globalHostilesCooldown > 0 &&
        `((${g.globalCooldown}>0))${v.hold}=1;`,
      cavern.context.globalHostilesCap > 0 &&
        `((hostiles>=${cavern.context.globalHostilesCap - waveSize}))${v.hold}=1;`,

      // Next check things that are total blockers
      !!opts.needCrystals &&
        `((crystals<${opts.needCrystals.increment ? v.needCrystals : opts.needCrystals.base}))${v.hold}=2;`,

      `((${v.firedCount}==0))${v.hold}-=1;`,
      `((${v.hold}>0))[${v.trip}=0][${v.firedCount}+=1];`,
    ),
    sh.trigger(
      `when(${v.firedCount}>0)`,
      cavern.context.globalHostilesCooldown > 0 && `${g.globalCooldown}+=1;`,
      !!opts.needCrystals?.increment &&
        `${v.needCrystals}=crystals+${opts.needCrystals.increment};`,

      // Do all the spawns.
      ...emerges.flatMap(
        (emerge) =>
          [
            `wait:random(${delay.min.toFixed(2)})(${delay.max.toFixed(2)});`,
            `emerge:${transformPoint(cavern, [emerge.x, emerge.y])},A,${opts.creature.id},${emerge.radius};`,
          ] satisfies EventChainLine[],
      ),

      // Cooldown and reset
      !once &&
        scriptFragment(
          opts.maxTriggerCount !== undefined &&
            `((${v.firedCount}>=${opts.maxTriggerCount}))return;`,
          opts.retriggerMode === "hoard" && `${v.retrip}=0;`,
          `wait:random(${cooldown.min.toFixed(2)})(${cooldown.max.toFixed(2)});`,
          opts.retriggerMode === "hoard" && `((${v.retrip}==0))return;`,
          `${v.trip}=0;`,
        ),
    ),
  );
}
