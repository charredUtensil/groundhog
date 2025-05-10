import { filterTruthy } from "../common/utils";
import {
  BUILD_POWER_GC_FIRST,
  BUILD_POWER_GC_LAST,
  BUILD_POWER_GC_PENULTIMATE,
  BUILD_POWER_SS_FIRST,
  BUILD_POWER_SS_LAST,
  BUILD_POWER_SS_PENULTIMATE,
} from "../lore/graphs/build_and_power";
import { Format, State } from "../lore/lore";
import { LoreDie } from "../common/prng";
import { PhraseGraph } from "../lore/utils/builder";
import { Architect } from "../models/architect";
import {
  Building,
  GEOLOGICAL_CENTER,
  SUPPORT_STATION,
} from "../models/building";
import { Plan } from "../models/plan";
import { Tile } from "../models/tiles";
import { OrderedOrEstablishedPlan } from "../transformers/01_planning/05_establish";
import { DefaultCaveArchitect, PartialArchitect } from "./default";
import { placeErosion } from "./utils/hazards";
import { intersectsOnly } from "./utils/intersects";
import { gObjectives } from "./utils/objectives";
import { getPlaceRechargeSeams } from "./utils/resources";
import { Rough, mkRough } from "./utils/rough";
import { EventChainLine, mkVars, transformPoint } from "./utils/script";

const TAG = "buildAndPower" as const;
export type BuildAndPowerMetadata = {
  readonly tag: typeof TAG;
  readonly template: Building["template"];
};

const BASE: PartialArchitect<BuildAndPowerMetadata> = {
  ...DefaultCaveArchitect,
  maxSlope: 15,
  placeBuildings({ cavern, plan, openCaveFlags }) {
    plan.innerPearl.some((ly) =>
      ly.some((pos) => {
        if (cavern.tiles.get(...pos)?.isWall === false) {
          openCaveFlags.set(...pos, true);
          return true;
        }
        return false;
      }),
    );
    return {};
  },
};

function buildAndPower(
  template: Building["template"],
  pgFirst: PhraseGraph<State, Format & { remainingCount: number }>,
  pgPenultimate: PhraseGraph<State, Format>,
  pgLast: PhraseGraph<State, Format>,
  minLevel: Building["level"],
): Pick<
  Architect<BuildAndPowerMetadata>,
  "prime" | "placeRechargeSeam" | "objectives" | "script" | "scriptGlobals"
> {
  const g = mkVars(`gBuPw${template.inspectAbbrev}`, [
    "built",
    "checkPower",
    "doneCount",
    "done",
    "msgA",
    "msgB",
    "msgC",
  ]);
  const metadata: BuildAndPowerMetadata = { tag: TAG, template };
  const mv = (plan: Plan<any>) =>
    mkVars(`p${plan.id}BuPw${template.inspectAbbrev}`, [
      "arrow",
      "building",
      "onBuild",
    ]);
  return {
    prime: () => metadata,
    placeRechargeSeam: getPlaceRechargeSeams(3),
    objectives({ cavern }) {
      const count = cavern.plans.filter(
        (plan) =>
          plan.metadata?.tag === TAG && plan.metadata.template === template,
      ).length;
      return {
        variables: [
          {
            condition: `${g.done}>0`,
            description: filterTruthy([
              "Build and power a ",
              minLevel > 1 ? `Level ${minLevel} ` : "",
              template.name,
              " in ",
              count === 1 && "the marked cave.",
              count === 2 && "both marked caves.",
              count > 2 && `all ${count} marked caves.`,
            ]).join(""),
          },
        ],
        sufficient: true,
      };
    },
    scriptGlobals({ cavern, sb }) {
      const pvs = cavern.plans
        .filter(
          (plan) =>
            plan.metadata?.tag === TAG && plan.metadata.template === template,
        )
        .map((plan) => mv(plan));
      // First trigger: when building is built or leveled up. This doesn't
      // work with mutexes properly, but this is the least likely event to
      // have collisions. In theory, it shouldn't be possible to level up
      // multiple buildings at the same time.
      sb.declareBuilding(g.built);
      sb.when(
        `${template.id}.${minLevel > 1 ? "levelup" : "new"}`,
        `savebuilding:${g.built};`,
        minLevel > 1 && `((${g.built}.level<${minLevel}))return;`,
        ...pvs.map((v) => `${v.onBuild};` satisfies EventChainLine),
      );

      // Second trigger: power state changes.
      sb.declareInt(g.checkPower, 0);
      sb.declareInt(g.doneCount, 0);
      pvs.forEach((v) => {
        sb.declareArrow(v.arrow);
        sb.declareBuilding(v.building);
      });
      sb.when(`${template.id}.poweron`, `${g.checkPower}+=1;`);
      sb.when(`${template.id}.poweroff`, `${g.checkPower}+=1;`);
      sb.when(
        `${g.checkPower}==1`,
        `${g.doneCount}=0;`,
        ...pvs.flatMap(
          (v) =>
            [
              `((${v.building}.powered>0))[hidearrow:${v.arrow}][showarrow:${v.building}.row,${v.building}.column,${v.arrow}];`,
              `((${v.building}.powered>0))${g.doneCount}+=1;`,
            ] satisfies EventChainLine[],
        ),
        `((${g.checkPower}>1))[${g.checkPower}=1][${g.checkPower}=0];`,
      );

      // Messages & done trigger
      if (pvs.length > 1) {
        sb.declareString(g.msgA, {
          die: LoreDie.buildAndPower,
          pg: pgFirst,
          format: {
            remainingCount: pvs.length - 1,
          },
        });
        sb.if(`${g.doneCount}==1`, `msg:${g.msgA};`);
      }
      if (pvs.length > 2) {
        sb.declareString(g.msgB, {
          die: LoreDie.buildAndPower,
          pg: pgPenultimate,
          format: {
            template,
          },
        });
        sb.if(`${g.doneCount}==${pvs.length - 1}`, `msg:${g.msgB};`);
      }
      sb.declareInt(g.done, 0);
      sb.declareString(g.msgC, {
        die: LoreDie.buildAndPower,
        pg: pgLast,
      });
      sb.if(
        `${g.doneCount}>=${pvs.length}`,
        `${gObjectives.met}+=1;`,
        `msg:${g.msgC};`,
        "wait:2;",
        `${g.done}=1;`,
      );
    },
    script({ cavern, plan, sb }) {
      const v = mv(plan);
      if (plan.path.baseplates.length > 1) {
        throw new Error("Plan must have one baseplate.");
      }
      const bp = plan.path.baseplates[0];
      const arrowPos = plan.innerPearl
        .flatMap((ly) => ly)
        .find((pos) => cavern.tiles.get(...pos)?.isWall === false);
      if (!arrowPos) {
        throw new Error("No non-wall points found");
      }
      const atp = transformPoint(cavern, arrowPos);
      const openOnSpawn = cavern.discoveryZones.get(...arrowPos)!.openOnSpawn;
      sb.if(
        `${openOnSpawn ? `time:0` : `change:${atp}`}`,
        `showarrow:${atp},${v.arrow};`,
      );
      sb.event(
        v.onBuild,
        // Filter out buildings outside the baseplate rectangle
        `((${g.built}.column<${bp.left - cavern.left}))return;`,
        `((${g.built}.column>=${bp.right - cavern.left}))return;`,
        `((${g.built}.row<${bp.top - cavern.top}))return;`,
        `((${g.built}.row>=${bp.bottom - cavern.top}))return;`,
        // Setting a building variable to the value of another building
        // variable doesn't work in MMScript for some reason
        `savebuilding:${v.building};`,
        `${g.checkPower}+=1;`,
      );
    },
  };
}

function bidHelper(
  plans: readonly OrderedOrEstablishedPlan[],
  template: Building["template"],
  max: number,
  dormant: number,
  active: number,
): number {
  let extantCount = 0;
  let unestablishedCount = 0;
  for (const p of plans) {
    if (p.kind === "cave" && !p.architect) {
      unestablishedCount++;
    } else if (p.metadata?.tag === TAG) {
      if (p.metadata.template !== template) {
        return 0;
      }
      extantCount += 1;
      if (extantCount >= max) {
        return 0;
      }
    }
  }
  if (extantCount > 0) {
    return active;
  } else {
    return unestablishedCount >= max * 2 ? dormant : 0;
  }
}

export const BUILD_AND_POWER = [
  {
    name: "BuildAndPower.GC",
    ...BASE,
    ...buildAndPower(
      GEOLOGICAL_CENTER,
      BUILD_POWER_GC_FIRST,
      BUILD_POWER_GC_PENULTIMATE,
      BUILD_POWER_GC_LAST,
      5,
    ),
    ...mkRough(
      { of: Rough.FLOOR, width: 2, grow: 1 },
      { of: Rough.MIX_DIRT_LOOSE_ROCK, grow: 1 },
      { of: Rough.MIX_LOOSE_HARD_ROCK, grow: 0.5 },
      { of: Rough.VOID, width: 0, grow: 0.5 },
    ),
    caveBid: ({ cavern, plans, plan, hops }) => {
      const amd = plans[cavern.anchor].metadata;
      return (
        !plan.fluid &&
        plan.pearlRadius > 2 &&
        plan.pearlRadius < 10 &&
        plan.path.baseplates.length === 1 &&
        // Incompatible with fchq, mob farm, and pandora
        !(amd?.tag === "hq" && amd.special === "fixedComplete") &&
        amd?.tag !== "mobFarm" &&
        amd?.tag !== "pandora" &&
        intersectsOnly(plans, plan, null) &&
        hops.length > 5 &&
        !hops.some((h) => plans[h].metadata?.tag === TAG) &&
        cavern.context.planWhimsy *
          bidHelper(plans, GEOLOGICAL_CENTER, 3, 0.04, 10)
      );
    },
  },
  {
    name: "BuildAndPower.SS.ForGasLeak",
    ...BASE,
    ...buildAndPower(
      SUPPORT_STATION,
      BUILD_POWER_SS_FIRST,
      BUILD_POWER_SS_PENULTIMATE,
      BUILD_POWER_SS_LAST,
      1,
    ),
    ...mkRough(
      { of: Rough.ALWAYS_FLOOR, width: 2 },
      { of: Rough.LAVA, width: 2, grow: 1 },
      { of: Rough.MIX_LOOSE_HARD_ROCK, grow: 0.5 },
      { of: Rough.HARD_ROCK, width: 0, grow: 0.5 },
      { of: Rough.MIX_FRINGE },
    ),
    caveBid: ({ cavern, plans, plan, hops }) => {
      const amd = plans[cavern.anchor].metadata;
      return (
        plan.fluid === Tile.LAVA &&
        plan.pearlRadius > 3 &&
        plan.path.baseplates.length === 1 &&
        amd?.tag === "hq" &&
        amd.special === "gasLeak" &&
        hops.length > 3 &&
        !hops.some((h) => plans[h].metadata?.tag === TAG) &&
        cavern.context.planWhimsy * bidHelper(plans, SUPPORT_STATION, 3, 10, 5)
      );
    },
    preErode: ({ cavern, plan, erosion }) => {
      plan.innerPearl.forEach((layer, i) => {
        if (i < 2) {
          layer.forEach((point) => {
            erosion.delete(...point);
          });
        } else {
          layer.forEach((point) => {
            if (cavern.tiles.get(...point)?.isFluid === false) {
              erosion.set(...point, true);
            }
          });
        }
      });
    },
    placeErosion: (args) => placeErosion(args, { cooldown: 45 }),
  },
] as const satisfies readonly Architect<BuildAndPowerMetadata>[];
