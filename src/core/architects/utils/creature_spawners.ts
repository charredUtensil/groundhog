import { PseudorandomStream } from "../../common";
import { Point } from "../../common/geometry";
import { CollapseUnion } from "../../common/utils";
import { Architect } from "../../models/architect";
import { SUPPORT_STATION } from "../../models/building";
import {
  CreatureTemplate,
  SLIMY_SLUG,
  monsterForBiome,
} from "../../models/creature";
import { DiscoveryZone } from "../../models/discovery_zone";
import { Plan } from "../../models/plan";
import { PreprogrammedCavern } from "../../transformers/04_ephemera/03_preprogram";
import { getDiscoveryPoint } from "./discovery";
import {
  EventChainLine,
  mkVars,
  ScriptBuilder,
  chainFragment,
  transformPoint,
} from "./script";

type CreatureSpawnerArgs = {
  readonly creature: CreatureTemplate;
  readonly rng: PseudorandomStream;

  readonly meanWaveSize?: number;
  readonly spawnRate?: number;
  readonly waveSize?: number;

  readonly reArmMode: ReArmMode;

  readonly emerges?: readonly Emerge[];
} & (
  | {
      readonly reArmMode: "none";
      readonly spawnEvent: string;
    }
  | {
      readonly armEvent?: string;
      readonly initialCooldown?: { min: number; max: number };
      readonly needCrystals?: { base: number; increment?: number };
      readonly needStableAir?: boolean;
      readonly tripOnArmed?: "first" | "always";
      readonly tripPoints?: readonly Point[];
    }
);

export type ReArmMode = "none" | "automatic" | "hoard";

enum ArmState {
  DISARMED = 0,
  ARMED,
  FIRE,
}

type Emerge = {
  readonly x: number;
  readonly y: number;
  readonly radius: number;
};

export const gCreatures = mkVars("gCrSp", [
  "globalCooldown",
  "airMiners",
  "anchorHold",
  "hostilesCap",
  "mob",
]);

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

function getTriggerPoints(
  cavern: PreprogrammedCavern,
  plan: Plan<any>,
): Point[] {
  // Pick any tile that was set with a value, even if it is solid rock.
  return plan.outerPearl[0].filter((point) => cavern.tiles.get(...point));
}

export function creatureSpawnGlobals({
  cavern,
  sb,
}: {
  cavern: PreprogrammedCavern;
  sb: ScriptBuilder;
}) {
  if (!cavern.context.hasMonsters && !cavern.context.hasSlugs) {
    return undefined;
  }
  if (cavern.context.globalHostilesCooldown > 0) {
    sb.declareInt(gCreatures.globalCooldown, 0);
    sb.when(
      `${gCreatures.globalCooldown}==1`,
      `wait:${cavern.context.globalHostilesCooldown};`,
      `${gCreatures.globalCooldown}=0;`,
    );
  }
  if (cavern.oxygen) {
    sb.declareInt(gCreatures.airMiners, 0);
    sb.when(`${SUPPORT_STATION.id}.poweron`, `${gCreatures.airMiners}+=10;`);
    sb.when(`${SUPPORT_STATION.id}.poweroff`, `${gCreatures.airMiners}-=10;`);
  }
  if (cavern.anchorHoldCreatures) {
    sb.declareInt(gCreatures.anchorHold, 1);
  }
  if (cavern.context.globalHostilesCap > 0) {
    let asleepAtStart = 0;
    const asleepByDz: {dz: DiscoveryZone, count: number}[] = [];
    cavern.creatures.forEach(mob => {
      if (mob.sleep) {
        const vMob = `${gCreatures.mob}${mob.id}`;
        sb.declareCreature(vMob, mob)
        sb.if(`${vMob}.wake`, `${gCreatures.hostilesCap}-=1;`);
        const dz = cavern.discoveryZones.get(Math.floor(mob.x), Math.floor(mob.y));
        if (!dz) {
          throw new Error(`Creature with id ${mob.id} starts outside a discovery zone`)
        }
        if (dz.openOnSpawn) {
          asleepAtStart++;
        } else {
          asleepByDz[dz.id] ||= {dz, count: 0};
          asleepByDz[dz.id].count++;
        }
      }
    });
    asleepByDz.forEach(({dz, count}) => {
      sb.if(`change:${transformPoint(cavern, dz.triggerPoint)}`, `${gCreatures.hostilesCap}+=${count};`);
    })
    sb.declareInt(gCreatures.hostilesCap, cavern.context.globalHostilesCap + asleepAtStart);
  }
}

type ScriptArgs = Parameters<NonNullable<Architect<any>["script"]>>[0];

export function monsterSpawnScript(
  args: ScriptArgs,
  opts?: Partial<CreatureSpawnerArgs>,
) {
  creatureSpawnScript(args, {
    creature: monsterForBiome(args.cavern.context.biome),
    reArmMode: "automatic",
    rng: args.cavern.dice.monsterSpawnScript(args.plan.id),
    ...opts,
  });
}

export function slugSpawnScript(
  args: ScriptArgs,
  opts?: Partial<CreatureSpawnerArgs>,
) {
  creatureSpawnScript(args, {
    creature: SLIMY_SLUG,
    needCrystals: { base: 1 },
    reArmMode: "automatic",
    rng: args.cavern.dice.slugSpawnScript(args.plan.id),
    ...opts,
  });
}

function creatureSpawnScript(
  { cavern, plan, sb }: ScriptArgs,
  opts: CollapseUnion<CreatureSpawnerArgs>,
) {
  const v = mkVars(`p${plan.id}${opts.creature.inspectAbbrev}Sp`, [
    "arm",
    "doCooldown",
    "doTrip",
    "doSpawn",
    "hoardTrip",
    "maxHostiles",
    "needCrystals",
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

  const emerges = cycleEmerges(
    opts.emerges ?? getEmerges(plan),
    opts.rng,
    waveSize,
  );

  if (!opts.spawnEvent) {
    // Arm
    sb.declareInt(v.arm, ArmState.DISARMED);
    const body: EventChainLine[] = [
      opts.initialCooldown &&
        `wait:random(${opts.initialCooldown.min.toFixed(2)})(${opts.initialCooldown.max.toFixed(2)});`,
      `${v.arm}=${ArmState.ARMED};`,
      opts.tripOnArmed && `${v.doTrip};`,
    ];
    if (opts.armEvent) {
      sb.event(opts.armEvent, ...body);
    } else {
      const dp = getDiscoveryPoint(cavern, plan);
      if (dp) {
        sb.if(`change:${transformPoint(cavern, dp)}`, ...body);
      } else {
        sb.onInit(...body);
      }
    }

    // Trip
    (opts.tripPoints ?? getTriggerPoints(cavern, plan)).forEach((point) =>
      sb.when(`enter:${transformPoint(cavern, point)}`, `${v.doTrip};`),
    );
    if (opts.needCrystals?.increment) {
      sb.declareInt(v.needCrystals, opts.needCrystals.base);
    }
    sb.event(
      v.doTrip,
      cavern.anchorHoldCreatures && `((${gCreatures.anchorHold}>0))return;`,
      cavern.context.globalHostilesCap > 0 && chainFragment(
        `${sb.declareInt(v.maxHostiles, 0)}=${gCreatures.hostilesCap}-${waveSize};`,
        `((hostiles>${v.maxHostiles}))return;`,
      ),
      cavern.oxygen &&
        opts.needStableAir &&
        `((${gCreatures.airMiners}<miners))return;`,
      opts.needCrystals &&
        `((crystals<${opts.needCrystals.increment ? v.needCrystals : opts.needCrystals.base}))return;`,
      cavern.context.globalHostilesCooldown > 0 &&
        `((${gCreatures.globalCooldown}>0))return;`,
      `((${v.arm}==${ArmState.ARMED}))${v.arm}=${ArmState.FIRE};`,
    );
    sb.when(`${v.arm}==${ArmState.FIRE}`, `${v.doSpawn};`);
  }

  // Hoard mode must be "manually" re-armed by a monster visiting the hoard
  // within cooldown.
  if (opts.reArmMode === "hoard") {
    sb.declareInt(v.hoardTrip, 0);
    plan.innerPearl[0].forEach((point) =>
      sb.when(
        `enter:${transformPoint(cavern, point)},${opts.creature.id}`,
        `${v.hoardTrip}=1;`,
      ),
    );
  }

  // Spawn
  sb.event(
    opts.spawnEvent ?? v.doSpawn,
    cavern.context.globalHostilesCooldown > 0 &&
      `${gCreatures.globalCooldown}+=1;`,
    !!opts.needCrystals?.increment &&
      `${v.needCrystals}=crystals+${opts.needCrystals.increment};`,
    ...emerges.map((emerge) =>
      chainFragment(
        `wait:random(${delay.min.toFixed(2)})(${delay.max.toFixed(2)});`,
        `emerge:${transformPoint(cavern, [emerge.x, emerge.y])},A,${opts.creature.id},${emerge.radius};`,
      ),
    ),
    opts.reArmMode !== "none" && `${v.doCooldown};`,
  );

  // Cooldown and reset
  if (opts.reArmMode !== "none") {
    const spawnRate = opts.spawnRate ?? plan.monsterSpawnRate;
    const meanCooldown = (60 * waveSize) / spawnRate;

    const cooldownOffset = meanCooldown / 4;
    const cooldown = {
      min: meanCooldown - cooldownOffset,
      max: meanCooldown + cooldownOffset,
    };
    sb.event(
      v.doCooldown,
      opts.reArmMode === "hoard" && `${v.hoardTrip}=0;`,
      `wait:random(${cooldown.min.toFixed(2)})(${cooldown.max.toFixed(2)});`,
      opts.reArmMode === "hoard" && `((${v.hoardTrip}==0))return;`,
      `${v.arm}=1;`,
      opts.tripOnArmed === "always" && `${v.doTrip};`,
    );
  }
}
