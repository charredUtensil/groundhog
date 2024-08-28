import { Architect } from "../../models/architect";
import { TOOL_STORE, TELEPORT_PAD, POWER_STATION, SUPPORT_STATION, DOCKS, SUPER_TELEPORT, UPGRADE_STATION, GEOLOGICAL_CENTER, ALL_BUILDINGS } from "../../models/building";
import { getTotalCrystals } from "../utils/resources";
import { eventChain, mkVars, scriptFragment } from "../utils/script";
import { BASE, HqMetadata, getPlaceBuildings } from "./base";


const T0_BUILDINGS = [
  TOOL_STORE,
  TELEPORT_PAD,
  POWER_STATION,
  SUPPORT_STATION,
  DOCKS,
  TOOL_STORE,
  SUPER_TELEPORT,
  UPGRADE_STATION,
  GEOLOGICAL_CENTER,
  SUPPORT_STATION,
] as const;

const T0_CRYSTALS = T0_BUILDINGS.reduce(
  (r, bt) => r + bt.crystals,
  0
);

const gFixedCompleteHq = mkVars("gFCHQ", ["onInit"]);

export const FC_BASE: Pick<
  Architect<HqMetadata>, "prime" | "placeBuildings" | "objectives" | "scriptGlobals"
> = {
  prime: () => ({
    crystalsInBuildings: T0_CRYSTALS,
    ruin: false,
    fixedComplete: true,
    tag: "hq",
  }),
  placeBuildings: getPlaceBuildings({
    discovered: true,
    templates: () => T0_BUILDINGS,
  }),
  objectives: ({ cavern }) => {
    return {
      crystals: Math.floor((getTotalCrystals(cavern) * 0.3) / 5) * 5,
      sufficient: false,
    };
  },
  scriptGlobals: ({ cavern }) => {
    const startBuildings = cavern.buildings.length;
    return scriptFragment(
      `# Globals: Fixed Complete HQ`,
      `if(time:0)[${gFixedCompleteHq.onInit}]`,
      eventChain(
        gFixedCompleteHq.onInit,
        // Can't just disable buildings because that disables fences - and
        // nobody wants that.
        ...ALL_BUILDINGS.map(
          (bt) => `disable:${bt.id};` as `${string};`
        )
      )
    );
  },
};

const FIXED_COMPLETE = [
  {
    name: "Fixed Complete HQ Spawn",
    ...BASE,
    ...FC_BASE,
    spawnBid: ({ plan }) => !plan.fluid && plan.pearlRadius > 6 && 0.1,
  },
] as const satisfies readonly Architect<HqMetadata>[];

export default FIXED_COMPLETE;