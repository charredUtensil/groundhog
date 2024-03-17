import { Architect } from "../models/architect"
import { DefaultCaveArchitect } from "./default"
import { Rough, RoughOyster } from "./oyster"

const BASE: typeof DefaultCaveArchitect = {
  ...DefaultCaveArchitect,
  placeEntities: ({})  => {
    
  },
}

// The L.M.S. Explorer's teleporters just seem to be real lousy in ice
// caverns for some reason.
const MULTIPLIER = {rock: 1.0, ice: 1.4, lava: 0.7} as const

const LOST_MINERS: readonly Architect[] = [
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
      plans.reduce((r, p) => r + 'architect' in p ? 0 : 1, 0) <= 3 &&
      MULTIPLIER[cavern.context.biome]
    )
  }
]

export default LOST_MINERS