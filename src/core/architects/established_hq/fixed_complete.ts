import { inferContextDefaults } from "../../common";
import { Architect } from "../../models/architect";
import {
  TOOL_STORE,
  TELEPORT_PAD,
  POWER_STATION,
  SUPPORT_STATION,
  DOCKS,
  SUPER_TELEPORT,
  UPGRADE_STATION,
  GEOLOGICAL_CENTER,
  ALL_BUILDINGS,
} from "../../models/building";
import {
  escapeString,
  eventChain,
  mkVars,
  scriptFragment,
} from "../utils/script";
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

const T0_CRYSTALS = T0_BUILDINGS.reduce((r, bt) => r + bt.crystals, 0);

const gFixedCompleteHq = mkVars("gFCHQ", [
  "onInit",
  "onBaseDestroyed",
  "msgBaseDestroyed",
  "wasBaseDestroyed",
]);

export const FC_BASE: Pick<
  Architect<HqMetadata>,
  "mod" | "prime" | "placeBuildings" | "scriptGlobals"
> = {
  mod: (cavern) => {
    const context = inferContextDefaults({
      crystalGoalRatio: 0.3,
      ...cavern.initialContext,
    });
    return { ...cavern, context };
  },
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
  scriptGlobals: ({ cavern }) => {
    return scriptFragment(
      `# Globals: Fixed Complete HQ`,
      `if(time:0)[${gFixedCompleteHq.onInit}]`,
      eventChain(
        gFixedCompleteHq.onInit,
        // Can't just disable buildings because that disables fences - and
        // nobody wants that.
        ...ALL_BUILDINGS.map((bt) => `disable:${bt.id};` as `${string};`),
      ),
      `string ${gFixedCompleteHq.msgBaseDestroyed}="${escapeString(cavern.lore.generateFailureBaseDestroyed(cavern.dice).text)}"`,
      `int ${gFixedCompleteHq.wasBaseDestroyed}=0`,
      `if(${TOOL_STORE.id}<=0)[${gFixedCompleteHq.onBaseDestroyed}]`,
      `if(${POWER_STATION.id}<=0)[${gFixedCompleteHq.onBaseDestroyed}]`,
      `if(${SUPPORT_STATION.id}<=0)[${gFixedCompleteHq.onBaseDestroyed}]`,
      eventChain(
        gFixedCompleteHq.onBaseDestroyed,
        `((${gFixedCompleteHq.wasBaseDestroyed}>0))return;`,
        `${gFixedCompleteHq.wasBaseDestroyed}=1;`,
        `msg:${gFixedCompleteHq.msgBaseDestroyed};`,
        `wait:5;`,
        `lose;`,
      ),
    );
  },
};

const FIXED_COMPLETE = [
  {
    name: "Hq.FixedComplete",
    ...BASE,
    ...FC_BASE,
    anchorBid: ({ plan }) => !plan.fluid && plan.pearlRadius > 6 && 0.1,
  },
] as const satisfies readonly Architect<HqMetadata>[];

export default FIXED_COMPLETE;
