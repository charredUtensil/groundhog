import { Point } from "../common/geometry"
import { Architect } from "../models/architect"
import { randomlyInTile } from "../models/position"
import { Tile } from "../models/tiles"
import { DefaultCaveArchitect, PartialArchitect } from "./default"
import { Rough, RoughOyster } from "./oyster"

type Metadata = {
  readonly minersCount: number
  readonly minersPoint: Point
}

const BASE: PartialArchitect<Metadata> = {
  ...DefaultCaveArchitect,
  prime: ({cavern, plan}) => {
    const rng = cavern.dice.prime(plan.id)
    const minersCount = rng.betaInt({a: 1, b: 2, min: 1, max: 5})
    const minersPoint = rng.uniformChoice(plan.innerPearl[0])
    return {minersCount, minersPoint}
  },
  placeEntities: ({cavern, plan, tiles, miners, minerFactory}) => {
    const [x, y] = plan.metadata.minersPoint
    tiles.set(x, y, Tile.FLOOR) // Ensure this tile is a floor tile just in case.
    const rng = cavern.dice.placeEntities(plan.id)
    for (let i = 0; i < plan.metadata.minersCount; i++) {
      miners.push(minerFactory.create({...randomlyInTile({x, y, rng})}))
    }
  }
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