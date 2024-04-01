import { Grid, MutableGrid } from "../../common/grid"
import { Landslide } from "../../models/hazards"
import { Plan } from "../../models/plan"
import { Tile } from "../../models/tiles"
import { RoughPlasticCavern } from "../../transformers/02_plastic/01_rough"

const LANDSLIDABLE_TILES: readonly (true | undefined)[] = (() => {
  const r: (true | undefined)[] = []
  r[Tile.DIRT.id] = true
  r[Tile.LOOSE_ROCK.id] = true
  r[Tile.HARD_ROCK.id] = true
  return r
})()

export function placeLandslides(
  totalFrequency: number,
  {cavern, plan, tiles, landslides}:
  {cavern: RoughPlasticCavern,
  plan: Plan,
  tiles: Grid<Tile>,
  landslides: MutableGrid<Landslide>,
}) {
  const rng = cavern.dice.placeLandslides(plan.id)
  const coverage = rng.uniform({min: 0.2, max: 0.8})

  plan.innerPearl.forEach(layer => {
    const positions = layer.filter(
      point => (
        !landslides.get(...point) &&
        LANDSLIDABLE_TILES[tiles.get(...point)?.id ?? -1] &&
        rng.chance(coverage)
      )
    )

    if (positions.length > 0) {
      // The total frequency passed above is in total landslides per minute
      // for the whole plan, but the serialized file format stores landslides
      // as the period between landslides at that tile, in seconds.
      const period = Math.max(
        positions.length * 60 / totalFrequency,
        cavern.context.minLandslideCooldown,
      )
      const event = new Landslide(period)
      positions.forEach(point => landslides.set(...point, event))
    }
  })
}