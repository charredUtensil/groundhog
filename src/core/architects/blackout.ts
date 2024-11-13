import { inferContextDefaults } from "../common";
import { BLACKOUT_START, BLACKOUT_END } from "../lore/graphs/events";
import { Architect, BaseMetadata } from "../models/architect";
import { DefaultSpawnArchitect, PartialArchitect } from "./default";
import { mkRough, Rough } from "./utils/rough";
import { mkVars } from "./utils/script";

const CRYSTALS_INITIAL = 10;
const CRYSTALS_INCREMENT_TO_RESET = 7;
const CRYSTALS_INCREMENT_TO_RETRIGGER = 15;
const MIN_AIR = 500;
const RESET_SECONDS = 120;
const RESET_END = 999;

const METADATA = { tag: "blackout" } as const satisfies BaseMetadata;

const BASE: PartialArchitect<typeof METADATA> = {
  ...DefaultSpawnArchitect,
  prime: () => METADATA,
  mod(cavern) {
    const context = inferContextDefaults({
      caveHasRechargeSeamChance: 0.15,
      hallHasRechargeSeamChance: 0.15,
      ...cavern.initialContext,
    });
    return { ...cavern, context };
  },
  script({ cavern, plan, sb }) {
    const v = mkVars(`p${plan.id}Bo`, [
      "crystalBank",
      "doReset",
      "loop",
      "ms",
      "msgStart",
      "msgEnd",
      "needCrystals",
      "reset",
      "tc",
      "trips",
    ]);
    const rng = cavern.dice.script(plan.id);
    sb.declareInt(v.crystalBank, 0);
    sb.declareInt(v.needCrystals, CRYSTALS_INITIAL);
    sb.declareInt(v.ms, 0);
    sb.declareInt(v.tc, 0);
    sb.declareInt(v.trips, 0);
    sb.declareInt(v.reset, 0);
    sb.declareString(v.msgStart, {
      pg: BLACKOUT_START,
      rng,
    });
    sb.declareString(v.msgEnd, {
      pg: BLACKOUT_END,
      rng,
    });
    sb.when(`crystals>=${v.needCrystals}`, `${v.trips}+=1;`);
    sb.when(
      `${v.trips}==1`,
      "wait:random(5)(30);",
      `${v.needCrystals}=crystals+${CRYSTALS_INCREMENT_TO_RESET};`,
      "disable:lights;",
      `${v.reset}=0;`,
      `${v.loop};`,
      "wait:1;",
      `${v.ms}=1;`,
    );
    sb.if(`${v.ms}==1`, `msg:${v.msgStart};`);
    sb.when(`building.dead`, `${v.reset}=${RESET_END};`);
    sb.when(`vehicle.dead`, `${v.reset}=${RESET_END};`);
    sb.when(`${v.crystalBank}>=${v.needCrystals}`, `${v.reset}=${RESET_END};`);
    sb.event(
      v.loop,
      `${v.tc}=crystals;`,
      `crystals-=${v.tc};`,
      `${v.crystalBank}+=${v.tc};`,
      `wait:1;`,
      cavern.oxygen && `((air<${MIN_AIR}))${v.reset}=${RESET_END};`,
      `${v.reset}+=1;`,
      `((${v.reset}>${RESET_SECONDS}))[${v.doReset}][${v.loop}];`,
    );
    sb.event(
      v.doReset,
      `crystals+=${v.crystalBank};`,
      `${v.needCrystals}=${v.crystalBank}+${CRYSTALS_INCREMENT_TO_RETRIGGER};`,
      `${v.crystalBank}=0;`,
      "wait:1;",
      "enable:lights;",
      `${v.trips}=0;`,
      `wait:1;`,
      `${v.ms}=2;`,
    );
    sb.if(`${v.ms}==2`, `msg:${v.msgEnd};`);
  },
};

const BLACKOUT = [
  {
    name: "Blackout",
    ...BASE,
    ...mkRough(
      { of: Rough.ALWAYS_FLOOR, width: 2, grow: 2 },
      { of: Rough.LOOSE_ROCK, grow: 1 },
      { of: Rough.MIX_FRINGE },
    ),
    anchorBid: ({ cavern, plan }) =>
      !plan.fluid &&
      plan.lakeSize >= 3 &&
      plan.pearlRadius > 0 &&
      !cavern.context.hasSlugs &&
      0.03,
  },
] as const satisfies readonly Architect<typeof METADATA>[];
export default BLACKOUT;
