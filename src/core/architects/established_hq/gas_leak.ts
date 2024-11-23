import { Architect } from "../../models/architect";
import {
  TOOL_STORE,
  POWER_STATION,
  SUPPORT_STATION,
  TELEPORT_PAD,
  ELECTRIC_FENCE_ID,
} from "../../models/building";
import { BASE, HqMetadata, getPlaceBuildings } from "./base";

const T0_BUILDINGS = [TOOL_STORE, TELEPORT_PAD, POWER_STATION, SUPPORT_STATION] as const;
const T0_CRYSTALS = T0_BUILDINGS.reduce((r, bt) => r + bt.crystals, 0);
const STARTING_BONUS_CRYSTALS = 2;

const GAS_LEAK_BASE: Pick<
  Architect<HqMetadata>,
  | "crystalsFromMetadata"
  | "prime"
  | "placeBuildings"
  | "scriptGlobals"
> = {
  crystalsFromMetadata: (metadata) => STARTING_BONUS_CRYSTALS + metadata.crystalsInBuildings,
  prime: () => {
    return {
      crystalsInBuildings: T0_CRYSTALS,
      ruin: false,
      special: "gasLeak",
      tag: "hq",
    };
  },
  placeBuildings: getPlaceBuildings({
    discovered: true,
    from: 2,
    templates: () => T0_BUILDINGS,
  }),
  scriptGlobals({sb}) {
    sb.onInit(
      `disable:${ELECTRIC_FENCE_ID};`,
      `crystals=${STARTING_BONUS_CRYSTALS};`
    )
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
