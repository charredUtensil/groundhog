import { Point } from "../common/geometry"
import { Architect } from "../models/architect"
import { randomlyInTile } from "../models/position"
import { Tile } from "../models/tiles"
import { DefaultCaveArchitect, PartialArchitect } from "./default"
import { Rough, RoughOyster } from "./oyster"
import { mkVars, transformPoint } from "./utils/script"

type Metadata = {
  readonly lostMinersCount: number
  readonly lostMinersPoint: Point
}

const g = mkVars('gFoundMiners', [
  'lostMinersCount', 'onFoundAll', 'messageFoundAll', 'done'
])

const BASE: PartialArchitect<Metadata> = {
  ...DefaultCaveArchitect,
  prime: ({cavern, plan}) => {
    const rng = cavern.dice.prime(plan.id)
    const lostMinersCount = rng.betaInt({a: 1, b: 2, min: 1, max: 5})
    const lostMinersPoint = rng.uniformChoice(plan.innerPearl[0])
    return {lostMinersCount, lostMinersPoint}
  },
  placeEntities: ({cavern, plan, tiles, miners, minerFactory}) => {
    const [x, y] = plan.metadata.lostMinersPoint
    tiles.set(x, y, Tile.FLOOR) // Ensure this tile is a floor tile just in case.
    const rng = cavern.dice.placeEntities(plan.id)
    for (let i = 0; i < plan.metadata.lostMinersCount; i++) {
      miners.push(minerFactory.create({...randomlyInTile({x, y, rng})}))
    }
  },
  scriptGlobals({cavern}) {
    const totalMiners = cavern.plans
      .reduce((t, plan) => t + (
        (plan.metadata as Metadata | undefined)?.lostMinersCount ?? 0), 0)
    const message = '???'
    return `# Lost Miners Globals
int ${g.lostMinersCount}=${totalMiners}
int ${g.done}=0
string ${g.messageFoundAll}="${message}"
${g.onFoundAll}::;
msg:${g.messageFoundAll};
wait:3;
${g.done}=1;
`
  },
  script({cavern, plan}) {
    const lostMinersPoint = transformPoint(cavern, plan.metadata.lostMinersPoint)
    const message = '???'
    const v = mkVars(`p${plan.id}FoundMiners`, [
      'messageDiscover', 'onDiscover', 'onIncomplete'
    ])
    return `# Found Lost Miners ${plan.id}
string ${v.messageDiscover}="${message}"
if(change:${lostMinersPoint})[${v.onDiscover}]
${v.onDiscover}::;
pan:${lostMinersPoint};
${g.lostMinersCount}=${g.lostMinersCount}-${plan.metadata.lostMinersCount};
((${g.lostMinersCount}>0))[${v.onIncomplete}][${g.onFoundAll}];

${v.onIncomplete}::;
msg:${v.messageDiscover};
`
  },
}

// The L.M.S. Explorer's teleporters just seem to be real lousy in ice
// caverns for some reason.
const MULTIPLIERS = {rock: 1.0, ice: 1.4, lava: 0.7} as const

const LOST_MINERS: readonly Architect<Metadata>[] = [
  {
    name: "Lost Miners",
    ...BASE,
    ...new RoughOyster(
      {of: Rough.ALWAYS_FLOOR, width: 2, shrink: 1, grow: 2},
      {of: Rough.ALWAYS_LOOSE_ROCK, grow: 1},
      {of: Rough.HARD_ROCK, grow: 0.5},
    ),
    caveBid: ({cavern, plans, plan}) => (
      !plan.fluid &&
      plan.pearlRadius >= 2 && plan.pearlRadius < 10 &&
      plans.reduce((r, p) => r + ('architect' in p ? 0 : 1), 0) <= 3 &&
      MULTIPLIERS[cavern.context.biome]
    )
  }
]

export default LOST_MINERS