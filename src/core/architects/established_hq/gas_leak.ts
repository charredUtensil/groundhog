import { inferContextDefaults } from "../../common";
import { GAS_LEAK_NO_AIR } from "../../lore/graphs/events";
import { Architect } from "../../models/architect";
import {
  TOOL_STORE,
  POWER_STATION,
  SUPPORT_STATION,
  TELEPORT_PAD,
  ELECTRIC_FENCE_ID,
} from "../../models/building";
import { gCreatures } from "../utils/creature_spawners";
import { gObjectives } from "../utils/objectives";
import { mkVars } from "../utils/script";
import { BASE, HqMetadata, getPlaceBuildings } from "./base";

const T0_BUILDINGS = [TOOL_STORE, TELEPORT_PAD, POWER_STATION, SUPPORT_STATION] as const;
const T0_CRYSTALS = T0_BUILDINGS.reduce((r, bt) => r + bt.crystals, 0);
const STARTING_BONUS_CRYSTALS = 2;

const GAS_LEAK_BASE: Pick<
  Architect<HqMetadata>,
  | "crystalsFromMetadata"
  | "mod"
  | "prime"
  | "placeBuildings"
  | "holdCreatures"
  | "script"
> = {
  mod(cavern) {
    const context = inferContextDefaults({
      globalHostilesCap: 4,
      ...cavern.initialContext,
    });
    return {...cavern, context, oxygen: [500, 500]}
  },
  prime: () => {
    return {
      crystalsInBuildings: T0_CRYSTALS,
      ruin: false,
      special: "gasLeak",
      tag: "hq",
    };
  },
  crystalsFromMetadata: (metadata) => STARTING_BONUS_CRYSTALS + metadata.crystalsInBuildings,
  placeBuildings: getPlaceBuildings({
    discovered: true,
    from: 2,
    templates: () => T0_BUILDINGS,
  }),
  holdCreatures: () => true,
  script({cavern, plan, sb}) {
    const v = mkVars(`p${plan.id}GlHq`, ['msgNoAir', 'holdLoop']);
    const rng = cavern.dice.script(plan.id);
    sb.onInit(
      `disable:${ELECTRIC_FENCE_ID};`,
      `crystals=${STARTING_BONUS_CRYSTALS};`,
      `${v.holdLoop};`,
    );
    sb.declareString(
      v.msgNoAir, {pg: GAS_LEAK_NO_AIR, rng}
    );
    sb.if(
      `${gCreatures.airMiners}==0`,
      `((${gObjectives.won}>0))return;`,
      `wait:5;`,
      `msg:${v.msgNoAir};`,
    );
    sb.event(
      v.holdLoop,
      // 5-10 minutes of peace
      `wait:random(${5 * 60})(${10 * 60});`,
      `${gCreatures.anchorHold}=0;`,
      // 5-10 minutes of monsters
      `wait:random(${5 * 60})(${10 * 60});`,
      `${gCreatures.anchorHold}=1;`,
      // Loop
      `${v.holdLoop};`,
    );
  },
};

const GAS_LEAK = [
  {
    name: "Hq.Spawn.GasLeak",
    ...BASE,
    ...GAS_LEAK_BASE,
    anchorBid: ({ cavern, plan }) =>
      cavern.context.biome === 'lava' &&
      cavern.context.hasMonsters &&
      cavern.context.hasAirLimit &&
      plan.lakeSize > 3 &&
      plan.pearlRadius > 3 &&
      0.2,
  },
] satisfies Architect<HqMetadata>[];

export default GAS_LEAK;
