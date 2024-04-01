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

const BETA_SUM = 10

export function placeLandslides(
  cooldownRange: {min: number, max: number},
  {cavern, plan, tiles, landslides}:
  {cavern: RoughPlasticCavern,
  plan: Plan,
  tiles: Grid<Tile>,
  landslides: MutableGrid<Landslide>,
}) {
  const rng = cavern.dice.placeLandslides(plan.id)

  // A spread closer to 1 means more landslide tiles, but they will tend to
  // trigger less frequently.
  const spread = rng.uniform({min: 0.2, max: 0.8})

  plan.innerPearl
    .flatMap(layer => layer)
    .filter(
      point => (
        !landslides.get(...point) &&
        LANDSLIDABLE_TILES[tiles.get(...point)?.id ?? -1] &&
        rng.chance(spread)
      )
    ).forEach(
      point => {
        const cooldown = rng.betaInt({
          ...cooldownRange,
          a: BETA_SUM * spread,
          b: BETA_SUM * (1 - spread),
        })
        landslides.set(...point, new Landslide(cooldown))
      }
    )
}