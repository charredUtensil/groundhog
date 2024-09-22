import {
  BUILD_POWER_GC_FIRST,
  BUILD_POWER_GC_LAST,
  BUILD_POWER_GC_PENULTIMATE,
} from "../lore/graphs/build_and_power";
import { LoreDie, spellNumber } from "../lore/lore";
import { Architect } from "../models/architect";
import { Building, GEOLOGICAL_CENTER } from "../models/building";
import { Plan } from "../models/plan";
import { OrderedOrEstablishedPlan } from "../transformers/01_planning/05_establish";
import { DefaultCaveArchitect, PartialArchitect } from "./default";
import { intersectsOnly } from "./utils/intersects";
import { Rough, mkRough } from "./utils/rough";
import {
  declareStringFromLore,
  eventChain,
  eventChainSynchronized,
  mkVars,
  scriptFragment,
  transformPoint,
} from "./utils/script";

const TAG = "buildAndPower" as const;
export type BuildAndPowerMetadata = {
  readonly tag: typeof TAG;
  readonly template: Building["template"];
};

const BASE: PartialArchitect<BuildAndPowerMetadata> = {
  ...DefaultCaveArchitect,
  maxSlope: 15,
};

function buildAndPower(
  template: Building["template"],
  minLevel: Building["level"] = 1,
): Pick<
  Architect<BuildAndPowerMetadata>,
  "prime" | "objectives" | "script" | "scriptGlobals"
> {
  const g = mkVars(`gBp${template.inspectAbbrev}`, [
    "onBuild",
    "built",
    "onPower",
    "doneCount",
    "done",
    "msgA",
    "msgB",
    "msgC",
    "onComplete",
  ]);
  const metadata: BuildAndPowerMetadata = { tag: TAG, template };
  const mv = (plan: Plan<any>) =>
    mkVars(`p${plan.id}Bp${template.inspectAbbrev}`, [
      "arrow",
      "building",
      "onInit",
      "onBuild",
    ]);
  return {
    prime: () => metadata,
    objectives({ cavern }) {
      const count = cavern.plans.filter(
        (plan) =>
          plan.metadata?.tag === TAG && plan.metadata.template === template,
      ).length;
      return {
        variables: [
          {
            condition: `${g.done}>0`,
            description: [
              "Build and power a ",
              minLevel > 1 ? `Level ${minLevel} ` : "",
              template.name,
              " in ",
              count > 1 ? "each" : "the",
              " marked cave.",
            ].join(""),
          },
        ],
        sufficient: true,
      };
    },
    scriptGlobals({ cavern }) {
      const pvs = cavern.plans
        .filter(
          (plan) =>
            plan.metadata?.tag === TAG && plan.metadata.template === template,
        )
        .map((plan) => mv(plan));
      return scriptFragment(
        `# Globals: Build and Power ${template.name}`,

        // First trigger: when building is built or leveled up. This doesn't
        // work with mutexes properly, but this is the least likely event to
        // have collisions. In theory, it shouldn't be possible to level up
        // multiple buildings at the same time.
        `building ${g.built}`,
        `when(${template.id}.${minLevel > 1 ? "levelup" : "new"})[${g.onBuild}]`,
        eventChain(
          g.onBuild,
          `savebuilding:${g.built};`,
          minLevel > 1 && `((${g.built}.level<${minLevel}))return;`,
          ...pvs.map((v) => `${v.onBuild};` satisfies `${string};`),
        ),

        // Second trigger: power state changes.
        `int ${g.doneCount}=0`,
        ...pvs.map((v) => `arrow ${v.arrow}`),
        ...pvs.map((v) => `building ${v.building}`),
        `when(${template.id}.poweron)[${g.onPower}]`,
        `when(${template.id}.poweroff)[${g.onPower}]`,
        eventChainSynchronized(
          g.onPower,
          `${g.doneCount}=0;`,
          ...pvs.flatMap(
            (v) =>
              [
                `((${v.building}.powered>0))[hidearrow:${v.arrow}][showarrow:${v.building}.row,${v.building}.column,${v.arrow}];`,
                `((${v.building}.powered>0))${g.doneCount}+=1;`,
              ] satisfies `${string};`[],
          ),
        ),

        // Messages & done trigger
        pvs.length > 1 &&
          scriptFragment(
            declareStringFromLore(
              cavern,
              LoreDie.buildAndPower,
              g.msgA,
              BUILD_POWER_GC_FIRST,
              {},
              {
                buildingName: template.name,
                remainingCount: spellNumber(pvs.length - 1),
              },
            ),
            `if(${g.doneCount}==1)[msg:${g.msgA}]`,
          ),
        pvs.length > 2 &&
          scriptFragment(
            declareStringFromLore(
              cavern,
              LoreDie.buildAndPower,
              g.msgB,
              BUILD_POWER_GC_PENULTIMATE,
              {},
              {
                buildingName: template.name,
              },
            ),
            `if(${g.doneCount}==${pvs.length - 1})[msg:${g.msgB}]`,
          ),
        `int ${g.done}=0`,
        declareStringFromLore(
          cavern,
          LoreDie.buildAndPower,
          g.msgC,
          BUILD_POWER_GC_LAST,
          {},
          {
            buildingName: template.name,
          },
        ),
        `if(${g.doneCount}>=${pvs.length})[${g.onComplete}]`,
        eventChain(g.onComplete, `msg:${g.msgC};`, "wait:2;", `${g.done}=1;`),
      );
    },
    script({ cavern, plan }) {
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

      return scriptFragment(
        `# P${plan.id}: Build and Power ${template.name}`,
        `if(${openOnSpawn ? `time:0` : `change:${atp}`})[${v.onInit}]`,
        eventChain(v.onInit, `showarrow:${atp},${v.arrow};`),
        eventChain(
          v.onBuild,
          // Filter out buildings outside the baseplate rectangle
          `((${g.built}.column<${bp.left - cavern.left}))return;`,
          `((${g.built}.column>=${bp.right - cavern.left}))return;`,
          `((${g.built}.row<${bp.top - cavern.top}))return;`,
          `((${g.built}.row>=${bp.bottom - cavern.top}))return;`,
          `savebuilding:${v.building};`,
          `${g.onPower};`,
        ),
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
): number | false {
  let extantCount = 0;
  let unestablishedCount = 0;
  for (const p of plans) {
    if (p.kind === "cave" && !p.architect) {
      unestablishedCount++;
    } else if (p.metadata?.tag === TAG) {
      if (p.metadata.template !== template) {
        return false;
      }
      extantCount += 1;
      if (extantCount >= max) {
        return false;
      }
    }
  }
  if (extantCount > 0) {
    return active;
  } else {
    return unestablishedCount >= max * 2 && dormant;
  }
}

export const BUILD_AND_POWER = [
  {
    name: "BuildAndPower.GeologicalCenter",
    ...BASE,
    ...buildAndPower(GEOLOGICAL_CENTER, 5),
    ...mkRough(
      { of: Rough.FLOOR, width: 2, grow: 1 },
      { of: Rough.MIX_DIRT_LOOSE_ROCK, grow: 1 },
      { of: Rough.MIX_LOOSE_HARD_ROCK, grow: 0.5 },
      { of: Rough.VOID, width: 0, grow: 0.5 },
    ),
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
    caveBid: ({ cavern, plans, plan, hops }) => {
      const amd = plans[cavern.anchor].metadata;
      return (
        !plan.fluid &&
        plan.pearlRadius > 2 &&
        plan.pearlRadius < 10 &&
        plan.path.baseplates.length === 1 &&
        !(amd?.tag === "hq" && amd.fixedComplete) &&
        intersectsOnly(plans, plan, null) &&
        hops.length > 5 &&
        !hops.some((h) => {
          const m = plans[h].metadata;
          return m?.tag === TAG && m.template === GEOLOGICAL_CENTER;
        }) &&
        bidHelper(plans, GEOLOGICAL_CENTER, 3, 0.04, 10)
      );
    },
  },
] as const satisfies readonly Architect<BuildAndPowerMetadata>[];
