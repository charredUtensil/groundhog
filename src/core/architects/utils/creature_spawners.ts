import { PseudorandomStream } from "../../common";
import { Point } from "../../common/geometry";
import { CollapseUnion } from "../../common/utils";
import { Architect } from "../../models/architect";
import { SUPPORT_STATION } from "../../models/building";
import { getAnchor } from "../../models/cavern";
import {
  CreatureTemplate,
  ICE_MONSTER,
  LAVA_MONSTER,
  ROCK_MONSTER,
  SLIMY_SLUG,
  monsterForBiome,
} from "../../models/creature";
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

  /** The number of creatures to spawn at a time. */
  readonly waveSize?: number;
  /**
   * If supplied, the _average_ number of creatures to spawn at a time.
   * Will vary up or down slightly based on RNG.
   */
  readonly meanWaveSize?: number;
  /**
   * The number of creatures to spawn per minute, assuming constant retriggers.
   */
  readonly spawnRate?: number;

  /**
   * How does this spawner become re-armed after firing?
   * - `none`: It doesn't.
   * - `automatic`: After monsters spawn and a "cooldown" timer has completed.
   * - `hoard`: Same as automatic, but only if monsters have reached the center
   *   of the plan.
   */
  readonly reArmMode: ReArmMode;

  /**
   * If supplied, the X,Y,and Radius of the `emerge:` events that will actually
   * spawn the creatures.
   */
  readonly emerges?: readonly Emerge[];

  /**
   * The name of the event used to arm the spawner, to be called from an
   * external script. If omitted, a name will be generated.
   */
  readonly armEvent?: string;
  /**
   * The name of the event used to trip the spawner, to be called from an
   * external script. If omitted, a name will be generated.
   */
  readonly tripEvent?: string;

  /**
   * The min/max time, in seconds, to wait between when this spawner is
   * initially enabled (usually on discover or at level start) and when the
   * spawner is armed for the first time.
   */
  readonly initialCooldown?: { min: number; max: number };
  /**
   * If included, this spawner will not activate if the player has less than
   * `base` crystals. If an `increment` is included, every time a spawn occurs,
   * the crystal requirement increases to `current crystals + increment`.
   */
  readonly needCrystals?: { base: number; increment?: number };
  /**
   * If included, this spawner will not activate if the player's air supply is
   * decreasing. That is - this is an air level and the player has more miners
   * than their current powered support stations can support.
   */
  readonly needStableAir?: boolean;
  /**
   * When the spawner is armed, trip automatically.
   */
  readonly tripOnArmed?: "first" | "always";
  /**
   * The points that will trip the spawner. Defaults to the plan's first outer
   * pearl layer.
   */
  readonly tripPoints?: readonly Point[];
  /**
   * By default, monster spawners will be skipped if `wantNormalMonsterSpawns`
   * returns false, and slug spawners will be skipped if `context.hasSlugs` is
   * false.
   * Setting `force` to true removes this restriction.
   */
  readonly force?: boolean;
};

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
  /**
   * A mutex that prevents two different monster spawners from triggering too
   * quickly in succession. Absent if there is no `globalHostilesCooldown` set
   * in `Context`.
   */
  "globalCooldown",
  /**
   * Tracks how many miners are currently supported by Support Stations. Absent
   * if this is not an air level.
   */
  "airMiners",
  /**
   * Used to allow the anchor to prevent monster spawns. It is not set by the
   * creature spawners, but by the anchor itself.
   */
  "anchorHold",
  /**
   * Counts the number of creatures that are currently alive and awake. Manic
   * Miners has a macro `hostiles` that approximates this, but includes
   * creatures that are sleeping and thus aren't actually a threat. Creature
   * spawners may refuse to fire if there are too many active threats. Absent
   * if there is no `globalHostilesCap` set in `Context`.
   */
  "active",
  /**
   * Used to store the initial monsters that are asleep in order to facilitate
   * the `active` computation above.
   */
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
    sb.declareInt(gCreatures.active, 0);
    cavern.creatures.forEach((mob) => {
      if (mob.sleep) {
        const vMob = `${gCreatures.mob}${mob.id}`;
        sb.declareCreature(vMob, mob);
        sb.if(`${vMob}.wake`, `${gCreatures.active}+=1;`);
      }
    });
    [ROCK_MONSTER, ICE_MONSTER, LAVA_MONSTER, SLIMY_SLUG].forEach((mob) => {
      // This trigger also fires when mobs fail to spawn.
      sb.when(
        `${mob.id}.dead`,
        `((${gCreatures.active}>0))${gCreatures.active}-=1;`,
      );
    });
  }
}

export function wantNormalMonsterSpawns(cavern: PreprogrammedCavern) {
  return (
    cavern.context.hasMonsters && getAnchor(cavern).metadata?.tag !== "pandora"
  );
}

type ScriptArgs = Parameters<NonNullable<Architect<any>["script"]>>[0];

export function monsterSpawnScript(
  args: ScriptArgs,
  opts?: Partial<CreatureSpawnerArgs>,
) {
  if (opts?.force || wantNormalMonsterSpawns(args.cavern)) {
    creatureSpawnScript(args, {
      creature: monsterForBiome(args.cavern.context.biome),
      reArmMode: "automatic",
      rng: args.cavern.dice.monsterSpawnScript(args.plan.id),
      ...opts,
    });
  }
}

export function slugSpawnScript(
  args: ScriptArgs,
  opts?: Partial<CreatureSpawnerArgs>,
) {
  if (opts?.force || args.cavern.context.hasSlugs) {
    creatureSpawnScript(args, {
      creature: SLIMY_SLUG,
      needCrystals: { base: 1 },
      reArmMode: "automatic",
      rng: args.cavern.dice.slugSpawnScript(args.plan.id),
      ...opts,
    });
  }
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
    "emerge",
    "hoardTrip",
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

  sb.declareInt(v.arm, ArmState.DISARMED);

  // Arm
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
  const tripEvent = opts.tripEvent ?? v.doTrip;
  (opts.tripPoints ?? getTriggerPoints(cavern, plan)).forEach((point) =>
    sb.when(`enter:${transformPoint(cavern, point)}`, `${tripEvent};`),
  );
  if (opts.needCrystals?.increment) {
    sb.declareInt(v.needCrystals, opts.needCrystals.base);
  }
  sb.event(
    tripEvent,
    cavern.anchorHoldCreatures && `((${gCreatures.anchorHold}>0))return;`,
    cavern.context.globalHostilesCap > 0 &&
      `((${gCreatures.active}>${cavern.context.globalHostilesCap - waveSize}))return;`,
    cavern.oxygen &&
      opts.needStableAir &&
      `((${gCreatures.airMiners}<miners))return;`,
    opts.needCrystals &&
      `((crystals<${opts.needCrystals.increment ? v.needCrystals : opts.needCrystals.base}))return;`,
    cavern.context.globalHostilesCooldown > 0 &&
      `((${gCreatures.globalCooldown}>0))return;`,
    `((${v.arm}==${ArmState.ARMED}))${v.arm}=${ArmState.FIRE};`,
  );

  // Spawn
  sb.when(`${v.arm}==${ArmState.FIRE}`, `${v.doSpawn};`);
  sb.event(
    v.doSpawn,
    cavern.context.globalHostilesCap > 0 &&
      `${gCreatures.active}+=${waveSize};`,
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
      `${v.arm}=${ArmState.ARMED};`,
      opts.tripOnArmed === "always" && `${v.doTrip};`,
    );
  }
}
