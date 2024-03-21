import { Architect } from "../models/architect";
import { Tile } from "../models/tiles";
import { DefaultCaveArchitect } from "./default";
import { Rough, RoughOyster } from "./oyster";
import { intersectsOnly, isDeadEnd } from "./utils/intersects";
import { mkVars, transformPoint } from "./utils/script";

const BASE: typeof DefaultCaveArchitect = {
  ...DefaultCaveArchitect
}

const g = mkVars('gHoard', ['wasTriggered', 'message', 'crystalsAvailable'])

const HOARD: typeof BASE = {
  ...BASE,
  scriptGlobals({cavern}) {
    if (!cavern.objectives.crystals) {
      return undefined
    }
    return `# Hoard Globals
bool ${g.wasTriggered}=false
string ${g.message}="found hoard!"
int ${g.crystalsAvailable}=0
`
  },
  script({cavern, plan}) {
    if (!cavern.objectives.crystals) {
      return undefined
    }
    // Generate a script that pans to this cave on discovery if collecting all
    // of the crystals would win the level.
    // TODO(charredutensil): Need to figure out clashes with lost miners
    const centerPoint = transformPoint(cavern, plan.innerPearl[0][0])
    const v = mkVars(`p${plan.id}Hoard`, [
      'onDiscovered', 'crystalsAvailable', 'go', 'noGo'
    ])

    return `# Found Hoard ${plan.id}
if(change:${centerPoint})[${v.onDiscovered}]
${v.onDiscovered}::;
((${g.wasTriggered}))return;
${g.wasTriggered}=true;
wait:1;
${v.crystalsAvailable}=crystals+Crystal_C;
((${v.crystalsAvailable}>=${cavern.objectives.crystals}))[${v.go}][${v.noGo}];

${v.go}::;
msg:${g.message};
pan:${centerPoint};

${v.noGo}::;
${g.wasTriggered}=false
`
  }
}

const RICH: typeof BASE = {
  ...BASE
}

const TREASURE: readonly Architect<unknown>[] = [
  {
    name: "Open Hoard",
    ...HOARD,
    ...new RoughOyster(
      { of: Rough.ALWAYS_FLOOR, width: 2, grow: 3},
      { of: Rough.LOOSE_ROCK, shrink: 1},
      { of: Rough.HARD_ROCK, grow: 0.5},
    ),
    caveBid: ({plans, plan}) => (
      !plan.fluid &&
      plan.path.baseplates.length === 1 &&
      isDeadEnd(plan) &&
      intersectsOnly(plans, plan, null) &&
      0.5
    ),
  },
  {
    name: "Sealed Hoard",
    ...HOARD,
    ...new RoughOyster(
      { of: Rough.ALWAYS_FLOOR, width: 1, grow: 3},
      { of: Rough.ALWAYS_LOOSE_ROCK},
      { of: Rough.ALWAYS_HARD_ROCK, grow: 0.5},
    ),
    caveBid: ({plan}) => (
      !plan.fluid &&
      plan.path.baseplates.length === 1 &&
      isDeadEnd(plan) &&
      0.5
    ),
  },
  {
    name: "Open Rich Cave",
    ...RICH,
    ...new RoughOyster(
      { of: Rough.ALWAYS_SOLID_ROCK, width: 0, grow: 1},
      { of: Rough.ALWAYS_HARD_ROCK, width: 0, grow: 0.5},
      { of: Rough.LOOSE_ROCK, grow: 2},
      { of: Rough.FLOOR, width: 2, shrink: 1, grow: 3},
      { of: Rough.LOOSE_ROCK, shrink: 1},
      { of: Rough.HARD_ROCK, grow: 0.5},
    ),
    caveBid: ({plan}) => (
      !plan.fluid &&
      plan.path.baseplates.length >= 1 &&
      isDeadEnd(plan) &&
      1
    ),
  },
  {
    name: "Rich Island",
    ...RICH,
    ...new RoughOyster(
      { of: Rough.ALWAYS_SOLID_ROCK, width: 0, grow: 1},
      { of: Rough.ALWAYS_HARD_ROCK, width: 0, grow: 0.5},
      { of: Rough.ALWAYS_LOOSE_ROCK, grow: 2},
      { of: Rough.WATER, width: 2, grow: 3},
      { of: Rough.LOOSE_ROCK, shrink: 1},
      { of: Rough.HARD_ROCK, grow: 0.5},
    ),
    caveBid: ({plan}) => (
      plan.fluid === Tile.WATER &&
      plan.pearlRadius > 3 &&
      plan.path.baseplates.length >= 1 &&
      isDeadEnd(plan) &&
      0.5
    ),
  },
  {
    name: "Peninsula Hoard",
    ...HOARD,
    ...new RoughOyster(
      { of: Rough.ALWAYS_FLOOR, width: 2, grow: 1},
      { of: Rough.BRIDGE_ON_WATER, width: 2, grow: 3},
      { of: Rough.LOOSE_ROCK, shrink: 1},
      { of: Rough.HARD_ROCK, grow: 0.5},
    ),
    caveBid: ({plans, plan}) => (
      plan.fluid === Tile.WATER &&
      plan.pearlRadius > 3 &&
      plan.path.baseplates.length >= 1 &&
      isDeadEnd(plan) &&
      intersectsOnly(plans, plan, null) &&
      0.5
    ),
  },
  {
    name: "Rich Lava Island",
    ...RICH,
    ...new RoughOyster(
      { of: Rough.ALWAYS_SOLID_ROCK, width: 0, grow: 1},
      { of: Rough.ALWAYS_HARD_ROCK, width: 0, grow: 0.5},
      { of: Rough.ALWAYS_LOOSE_ROCK, grow: 2},
      { of: Rough.LAVA, width: 2, grow: 3},
      { of: Rough.HARD_ROCK, grow: 0.5},
    ),
    caveBid: ({plan}) => (
      plan.fluid === Tile.WATER &&
      plan.pearlRadius > 3 &&
      plan.path.baseplates.length >= 1 &&
      isDeadEnd(plan) &&
      0.5
    ),
  },
  {
    name: "Lava Peninsula Hoard",
    ...HOARD,
    ...new RoughOyster(
      { of: Rough.ALWAYS_FLOOR, width: 2, grow: 1},
      { of: Rough.BRIDGE_ON_LAVA, width: 2, grow: 3},
      { of: Rough.HARD_ROCK, grow: 0.5},
    ),
    caveBid: ({plans, plan}) => (
      plan.fluid === Tile.LAVA &&
      plan.pearlRadius > 3 &&
      plan.path.baseplates.length >= 1 &&
      isDeadEnd(plan) &&
      intersectsOnly(plans, plan, null) &&
      0.5
    ),
  }
]
export default TREASURE