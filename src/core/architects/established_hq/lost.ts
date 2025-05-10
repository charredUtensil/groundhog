import { FOUND_HQ } from "../../lore/graphs/events";
import { LoreDie } from "../../common/prng";
import { Architect } from "../../models/architect";
import { getDiscoveryPoint } from "../utils/discovery";
import { placeLandslides } from "../utils/hazards";
import { gObjectives } from "../utils/objectives";
import { DzPriority, mkVars, transformPoint } from "../utils/script";
import { BASE, HqMetadata, getPlaceBuildings, getPrime } from "./base";
import { DiscoveredCavern } from "../../transformers/03_plastic/01_discover";

const MAX_HOPS = 3;

export const gLostHq = mkVars("gLostHq", ["foundHq"]);

/** Returns true if there is a "lost" HQ in this map. */
export function isHqLost(cavern: DiscoveredCavern) {
  return cavern.buildings.some((b) => {
    const pos = b.foundation[0];
    if (cavern.discoveryZones.get(...pos)?.openOnSpawn) {
      return false;
    }
    return cavern.pearlInnerDex
      .get(...pos)
      ?.some((_, id) => cavern.plans[id].metadata?.tag === "hq");
  });
}

const LOST_BASE: Pick<
  Architect<HqMetadata>,
  "objectives" | "claimEventOnDiscover" | "scriptGlobals" | "script"
> = {
  objectives: ({ cavern }) => {
    if (isHqLost(cavern)) {
      return {
        sufficient: false,
        tag: "findHq",
        variables: [
          {
            condition: `${gLostHq.foundHq}>0`,
            description: "Find the lost Rock Raider HQ",
          },
        ],
      };
    }
    return {
      sufficient: false,
      tag: "reachHq",
      variables: [
        {
          condition: `${gLostHq.foundHq}>0`,
          description: "Reach the abandoned Rock Raider HQ",
        },
      ],
    };
  },
  claimEventOnDiscover({ cavern, plan }) {
    if (!cavern.objectives.tags.findHq) {
      return [];
    }
    const pos = getDiscoveryPoint(cavern, plan);
    if (!pos) {
      throw new Error("Cave has Find HQ objective but no undiscovered point.");
    }
    return [{ pos, priority: DzPriority.OBJECTIVE }];
  },
  scriptGlobals: ({ sb }) => sb.declareInt(gLostHq.foundHq, 0),
  script({ cavern, plan, sb }) {
    if (cavern.objectives.tags.findHq) {
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
          `wait:1;`,
          `${gObjectives.met}+=1;`,
          `${gLostHq.foundHq}=1;`,
        );
      }
    } else if (cavern.objectives.tags.reachHq) {
      const v = mkVars(`p${plan.id}LoHq`, ["messageReach", "reached"]);
      sb.declareString(v.messageReach, {
        die: LoreDie.foundHq,
        pg: FOUND_HQ,
      });
      sb.declareInt(v.reached, 0);
      sb.if(
        `${v.reached}>=1`,
        `wait:1;`,
        `msg:${v.messageReach};`,
        `${gObjectives.met}+=1;`,
        `${gLostHq.foundHq}=1;`,
      );
      plan.outerPearl[0].forEach((pos) => {
        if (cavern.tiles.get(...pos)) {
          sb.when(`enter:${transformPoint(cavern, pos)}`, `${v.reached}=1;`);
        }
      });
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
      cavern.context.planWhimsy *
        (plans[hops[0]].metadata?.tag === "nomads" ? 5 : 0.5),
  },
] as const satisfies readonly Architect<HqMetadata>[];

export default LOST;
