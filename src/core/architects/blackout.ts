import { inferContextDefaults } from "../common";
import { BLACKOUT_START, BLACKOUT_END } from "../lore/graphs/events";
import { Architect, BaseMetadata } from "../models/architect";
import { POWER_STATION } from "../models/building";
import { DefaultSpawnArchitect, PartialArchitect } from "./default";
import { mkRough, Rough } from "./utils/rough";
import { mkVars, transformPoint } from "./utils/script";

const CRYSTALS_INITIAL = 10;
const CRYSTALS_INCREMENT_TO_RESET = 7;
const CRYSTALS_INCREMENT_TO_RETRIGGER = 15;
const MIN_AIR = 500;
const RESET_SECONDS = 120;

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
      "hasPS",
      "loop",
      "showMsg",
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
    sb.declareInt(v.tc, 0);
    const powerStations = cavern.buildings.filter(
      (b) => b.template === POWER_STATION,
    );
    if (
      powerStations.some(
        (b) => cavern.discoveryZones.get(...b.foundation[0])?.openOnSpawn,
      )
    ) {
      // Spawn with power station: ready at start
      sb.declareInt(v.trips, 0);
    } else {
      sb.declareInt(v.trips, 2);
      if (powerStations.length) {
        sb.declareInt(v.hasPS, 0);
        sb.if(`${POWER_STATION.id}.new`, `${v.hasPS}=1;`);
        powerStations.forEach((b) =>
          sb.if(
            `change:${transformPoint(cavern, b.foundation[0])}`,
            `${v.hasPS}=1;`,
          ),
        );
        sb.if(`${v.hasPS}>0`, `${v.trips}=0;`);
      } else {
        sb.if(`${POWER_STATION.id}.new`, `${v.trips}=0;`);
      }
    }
    sb.when(`crystals>=${v.needCrystals}`, `${v.trips}+=1;`);
    sb.declareInt(v.showMsg, 0);
    sb.when(
      `${v.trips}==1`,
      "wait:random(5)(30);",
      `${v.needCrystals}=crystals+${CRYSTALS_INCREMENT_TO_RESET};`,
      "disable:lights;",
      `${v.reset}=0;`,
      `${v.loop};`,
      "wait:1;",
      `${v.showMsg}=1;`,
    );
    sb.declareString(v.msgStart, {
      pg: BLACKOUT_START,
      rng,
    });
    sb.if(`${v.showMsg}==1`, `msg:${v.msgStart};`);

    sb.declareInt(v.reset, 0);
    sb.when(`building.dead`, `${v.reset}=${RESET_SECONDS - 5};`);
    sb.when(`vehicle.dead`, `${v.reset}=${RESET_SECONDS - 5};`);
    sb.when(
      `${v.crystalBank}>=${v.needCrystals}`,
      `${v.reset}=${RESET_SECONDS};`,
    );
    sb.event(
      v.loop,
      `${v.tc}=crystals;`,
      `crystals-=${v.tc};`,
      `${v.crystalBank}+=${v.tc};`,
      `wait:1;`,
      cavern.oxygen && `((air<${MIN_AIR}))${v.reset}=${RESET_SECONDS};`,
      `${v.reset}+=1;`,
      `((${v.reset}>=${RESET_SECONDS}))[${v.doReset}][${v.loop}];`,
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
      `${v.showMsg}=2;`,
    );
    sb.declareString(v.msgEnd, {
      pg: BLACKOUT_END,
      rng,
    });
    sb.if(`${v.showMsg}==2`, `msg:${v.msgEnd};`);
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
      cavern.context.anchorWhimsy * 0.03,
  },
] as const satisfies readonly Architect<typeof METADATA>[];
export default BLACKOUT;
