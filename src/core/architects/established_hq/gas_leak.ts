import { inferContextDefaults } from "../../common";
import { GAS_LEAK_INSUFF_AIR, GAS_LEAK_NO_AIR } from "../../lore/graphs/events";
import { Architect } from "../../models/architect";
import {
  TOOL_STORE,
  POWER_STATION,
  SUPPORT_STATION,
  TELEPORT_PAD,
  ELECTRIC_FENCE_ID,
} from "../../models/building";
import { monsterForBiome } from "../../models/creature";
import { gCreatures } from "../utils/creature_spawners";
import { hintSelectLaserGroup } from "../utils/hints";
import { gObjectives } from "../utils/objectives";
import { mkVars } from "../utils/script";
import { BASE, HqMetadata, getPlaceBuildings } from "./base";

const T0_BUILDINGS = [
  { bt: TOOL_STORE, required: true },
  { bt: POWER_STATION, required: true },
  { bt: SUPPORT_STATION, required: true },
  { bt: TELEPORT_PAD, required: false },
] as const;
const T0_CRYSTALS = T0_BUILDINGS.reduce((r, { bt }) => r + bt.crystals, 0);
const STARTING_BONUS_CRYSTALS = 2;
const GLOBAL_HOSTILES_CAP = 4;
const MONSTERS_UNTIL_RESPITE = 10;
const RESPITE_MIN = 4 * 60;
const RESPITE_MAX = 7 * 60;

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
      globalHostilesCap: GLOBAL_HOSTILES_CAP,
      ...cavern.initialContext,
    });
    return { ...cavern, context, oxygen: [500, 500] };
  },
  prime: () => {
    return {
      crystalsInBuildings: T0_CRYSTALS,
      ruin: false,
      special: "gasLeak",
      tag: "hq",
    };
  },
  crystalsFromMetadata: (metadata) =>
    STARTING_BONUS_CRYSTALS + metadata.crystalsInBuildings,
  placeBuildings: getPlaceBuildings({
    discovered: true,
    from: 2,
    templates: () => T0_BUILDINGS,
  }),
  holdCreatures: () => true,
  script({ cavern, plan, sb }) {
    const v = mkVars(`p${plan.id}GlHq`, [
      "msgNoAir",
      "msgInsuffAir",
      "monstersCount",
    ]);
    const rng = cavern.dice.script(plan.id);
    sb.onInit(
      `disable:${ELECTRIC_FENCE_ID};`,
      `crystals=${STARTING_BONUS_CRYSTALS};`,
      `wait:${RESPITE_MIN};`,
      `${gCreatures.anchorHold}=0;`,
    );
    sb.declareString(v.msgNoAir, { pg: GAS_LEAK_NO_AIR, rng });
    sb.declareString(v.msgInsuffAir, { pg: GAS_LEAK_INSUFF_AIR, rng });
    sb.if(
      `${gCreatures.airMiners}<miners`,
      `((${gObjectives.won}>0))return;`,
      `wait:5;`,
      `((${gCreatures.airMiners}>0))[msg:${v.msgInsuffAir}][msg:${v.msgNoAir}];`,
    );
    sb.declareInt(v.monstersCount, 0);
    sb.when(
      `${monsterForBiome(cavern.context.biome).id}.new`,
      `${v.monstersCount}+=1;`,
    );
    sb.when(
      `${v.monstersCount}==${MONSTERS_UNTIL_RESPITE}`,
      `${gCreatures.anchorHold}=1;`,
      `wait:random(${RESPITE_MIN})(${RESPITE_MAX});`,
      `${gCreatures.anchorHold}=0;`,
      `${v.monstersCount}=0;`,
    );
    hintSelectLaserGroup(sb);
  },
};

const GAS_LEAK = [
  {
    name: "Hq.Spawn.GasLeak",
    ...BASE,
    ...GAS_LEAK_BASE,
    anchorBid: ({ cavern, plan }) =>
      cavern.context.biome === "lava" &&
      cavern.context.hasMonsters &&
      cavern.context.hasAirLimit &&
      !plan.fluid &&
      plan.lakeSize > 3 &&
      plan.pearlRadius > 3 &&
      cavern.context.anchorWhimsy * 0.2,
  },
] satisfies Architect<HqMetadata>[];

export default GAS_LEAK;
