import { FOUND_HQ } from "../../lore/graphs/events";
import { LoreDie } from "../../lore/lore";
import { Architect } from "../../models/architect";
import { getDiscoveryPoint } from "../utils/discovery";
import { placeLandslides } from "../utils/hazards";
import {
  DzPriorities,
  scriptFragment,
  mkVars,
  transformPoint,
  eventChain,
  declareStringFromLore,
} from "../utils/script";
import { BASE, HqMetadata, getPlaceBuildings, getPrime } from "./base";

const MAX_HOPS = 3;

export const gLostHq = mkVars("gLostHq", ["foundHq"]);

const LOST_BASE: Pick<
  Architect<HqMetadata>,
  "objectives" | "claimEventOnDiscover" | "scriptGlobals" | "script"
> = {
  objectives: () => ({
    variables: [
      {
        condition: `${gLostHq.foundHq}>0`,
        description: "Find the lost Rock Raider HQ",
      },
    ],
    sufficient: false,
  }),
  claimEventOnDiscover({ cavern, plan }) {
    const pos = getDiscoveryPoint(cavern, plan);
    if (!pos) {
      throw new Error("Cave has Find HQ objective but no undiscovered point.");
    }
    return [{ pos, priority: DzPriorities.OBJECTIVE }];
  },
  scriptGlobals: () =>
    scriptFragment("# Globals: Lost HQ", `int ${gLostHq.foundHq}=0`),
  script({ cavern, plan }) {
    const discoPoint = getDiscoveryPoint(cavern, plan)!;
    const shouldPanMessage =
      cavern.ownsScriptOnDiscover[
        cavern.discoveryZones.get(...discoPoint)!.id
      ] === plan.id;

    const camPoint = plan.path.baseplates.reduce((r, p) => {
      return r.pearlRadius > p.pearlRadius ? r : p;
    }).center;

    const v = mkVars(`p${plan.id}LostHq`, ["messageDiscover", "onDiscover"]);

    return scriptFragment(
      `# P${plan.id}: Lost HQ`,
      shouldPanMessage &&
        declareStringFromLore(
          cavern,
          LoreDie.foundHq,
          v.messageDiscover,
          FOUND_HQ,
          {},
          {},
        ),
      `if(change:${transformPoint(cavern, discoPoint)})[${v.onDiscover}]`,
      eventChain(
        v.onDiscover,
        shouldPanMessage && `msg:${v.messageDiscover};`,
        shouldPanMessage && `pan:${transformPoint(cavern, camPoint)};`,
        `wait:1;`,
        `${gLostHq.foundHq}=1;`,
      ),
    );
  },
};

const LOST = [
  {
    name: "Hq.Lost.Established",
    ...BASE,
    ...LOST_BASE,
    prime: getPrime(15, false),
    placeBuildings: getPlaceBuildings({}),
    caveBid: ({ plan, hops, plans }) =>
      !plan.fluid &&
      plan.pearlRadius > 5 &&
      hops.length <= MAX_HOPS &&
      !hops.some((id) => plans[id].fluid) &&
      !plans.some((p) => p.metadata?.tag === "hq") &&
      0.5,
  },
  {
    name: "Hq.Lost.Ruins",
    ...BASE,
    ...LOST_BASE,
    prime: getPrime(15, true),
    placeBuildings: getPlaceBuildings({ from: 3 }),
    placeLandslides: (args) => placeLandslides({ min: 15, max: 100 }, args),
    caveBid: ({ plan, hops, plans }) =>
      !plan.fluid &&
      plan.pearlRadius > 6 &&
      hops.length <= MAX_HOPS &&
      !plans.some((p) => p.metadata?.tag === "hq") &&
      (plans[hops[0]].metadata?.tag === "nomads" ? 5 : 0.5),
  },
] as const satisfies readonly Architect<HqMetadata>[];

export default LOST;
