import { FOUND_HQ } from "../../lore/graphs/events";
import { LoreDie } from "../../lore/lore";
import { Architect } from "../../models/architect";
import { getDiscoveryPoint } from "../utils/discovery";
import { placeLandslides } from "../utils/hazards";
import { gObjectives } from "../utils/objectives";
import { DzPriority, mkVars, transformPoint } from "../utils/script";
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
    return [{ pos, priority: DzPriority.OBJECTIVE }];
  },
  scriptGlobals: ({ sb }) => sb.declareInt(gLostHq.foundHq, 0),
  script({ cavern, plan, sb }) {
    const discoPoint = getDiscoveryPoint(cavern, plan)!;
    const shouldPanMessage =
      cavern.ownsScriptOnDiscover[
        cavern.discoveryZones.get(...discoPoint)!.id
      ] === plan.id;

    const camPoint = plan.path.baseplates.reduce((r, p) => {
      return r.pearlRadius > p.pearlRadius ? r : p;
    }).center;

    const v = mkVars(`p${plan.id}LoHq`, ["messageDiscover"]);

    if (shouldPanMessage) {
      sb.declareString(v.messageDiscover, {
        die: LoreDie.foundHq,
        pg: FOUND_HQ,
      });
      sb.if(
        `change:${transformPoint(cavern, discoPoint)}`,
        shouldPanMessage && `msg:${v.messageDiscover};`,
        shouldPanMessage && `pan:${transformPoint(cavern, camPoint)};`,
        `${gObjectives.met}+=1;`,
        `wait:1;`,
        `${gLostHq.foundHq}=1;`,
      );
    }
  },
};

const LOST = [
  {
    name: "Hq.Lost.Established",
    ...BASE,
    ...LOST_BASE,
    prime: getPrime(15, false),
    placeBuildings: getPlaceBuildings({}),
    caveBid: ({ cavern, plan, hops, plans }) =>
      !plan.fluid &&
      plan.pearlRadius > 5 &&
      hops.length <= MAX_HOPS &&
      plans[cavern.anchor]?.metadata?.tag !== "mobFarm" &&
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
    caveBid: ({ cavern, plan, hops, plans }) =>
      !plan.fluid &&
      plan.pearlRadius > 6 &&
      hops.length <= MAX_HOPS &&
      plans[cavern.anchor]?.metadata?.tag !== "mobFarm" &&
      !plans.some((p) => p.metadata?.tag === "hq") &&
      (plans[hops[0]].metadata?.tag === "nomads" ? 5 : 0.5),
  },
] as const satisfies readonly Architect<HqMetadata>[];

export default LOST;
