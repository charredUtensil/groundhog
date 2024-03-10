import { PseudorandomStream } from "../../common";
import { plotLine } from "../../common/geometry";
import { Grid } from "../../common/grid";
import { pairEach } from "../../common/utils";
import { CavernWithPartialPlans } from "../../models/cavern";
import { Established, Pearl, Pearled } from "../../models/plan";

const NESW: ReadonlyArray<readonly [number, number]> =
  [[0, -1], [1, 0], [0, 1], [-1, 0]];

class LayerGrid extends Grid<number> {
  atLayer(layer: number) {
    const result: [number, number][] = []
    this.forEach((ly, x, y) => {
      if (ly === layer) {
        result.push([x, y])
      }
    })
    return result
  }

  set(x: number, y: number, layer: number) {
    if (layer > (this.get(x, y) ?? -1)) {
      super.set(x, y, layer)
    }
  }
}

function hallNucleus(grid: LayerGrid, plan: Established) {
  pairEach(plan.path.baseplates, (a, b) => {
    for (const [x, y] of plotLine(a.center, b.center)) {
      grid.set(x, y, 0)
    }
  })
}

function caveNucleus(grid: LayerGrid, plan: Established) {
  // The cave nucleus is less straightforward.


  plan.path.baseplates.forEach(bp => {
    const layer = plan.pearlRadius - bp.pearlRadius
    // The offset is half the size of the pearl in that direction.
    // This creates a dot or rectangle depending on how oblong the baseplate is.
    const ox = Math.min(bp.pearlRadius, (bp.width - 1) >> 1)
    const oy = Math.min(bp.pearlRadius, (bp.height - 1) >> 1)
    for (let x = bp.left + ox; x < bp.right - ox; x++) {
      for (let y = bp.top + oy; y < bp.bottom - ox; y++) {
        grid.set(x, y, layer)
      }
    }
  })

  pairEach(plan.path.baseplates, (a, b) => {
    const layer = plan.pearlRadius - Math.min(a.pearlRadius, b.pearlRadius)
    for (const [x, y] of plotLine(a.center, b.center)) {
      grid.set(x, y, layer)
    }
  })
}

function trail(
  grid: LayerGrid,
  rng: PseudorandomStream,
  baroqueness: number,
  layer: number,
  cp: {x: number, y: number, vx: number, vy: number} | null,
): [number, number][] {
  const result: [number, number][] = []
  while (cp) {
    const {x, y, vx, vy} = cp
    cp = null
    grid.set(x, y, layer)
    // As it turns right, (vx, vy) cycles between:
    // (1, 0) -> (0, 1) -> (-1, 0) -> (0, -1) -> ...
    // Try each of these possible movements
    // prettier-ignore
    const nextPoints = [
      {ox:   0, oy:   0, vx: -vy, vy:  vx}, // Right turn
      {ox: -vy, oy:  vx, vx:  vx, vy:  vy}, // Straight, but drift right
      {ox:   0, oy:   0, vx:  vx, vy:  vy}, // Straight
      {ox:  vy, oy: -vx, vx:  vx, vy:  vy}, // Straight, but drift left
      {ox:   0, oy:   0, vx:  vy, vy: -vx}, // Left turn
    ].map((np) => ({...np, x: x + np.ox + np.vx, y: y + np.oy + np.vy}))
    
    const halt = nextPoints.some(({x, y}) => {
      const ly = grid.get(x, y) ?? -1
      if (ly >= layer) {
        for (let i = result.length - 1; i > Math.max(result.length - 4, 0); i--) {
          const [rx, ry] = result[i]
          if (rx === x && ry === y) {
            // Found a recently visited point
            return false
          }
        }
        // Found a point on this layer not recently visited
        return true
      }
      // Found no points on this layer
      return false
    })

    result.push([x, y])

    if (halt) { break }
    
    nextPoints.some(np => {
      // If the point was not visited and the rng allows it
      if (grid.get(x, y) ?? -1 < 0) {
        if (baroqueness <= 0 || !rng.chance(baroqueness)) {
          // visit it next.
          cp = np
          return true
        }
      }
    })
  }
  return result
}

function addLayer(
  grid: LayerGrid,
  rng: PseudorandomStream,
  baroqueness: number,
  layer: number
): [number, number][] {
  return grid.atLayer(layer - 1).flatMap(([x, y]) => {
    for (const [ox, oy] of NESW) {
      if (grid.get(x + ox, y + oy) ?? -1 < 0) {
        return trail(grid, rng, baroqueness, layer, {x, y, vx: -oy, vy: ox})
      }
    }
    return []
  })
}

export default function pearl(
  cavern: CavernWithPartialPlans<Established>
): CavernWithPartialPlans<Pearled> {
  const plans = cavern.plans.map(plan => {
    const rng = cavern.dice.pearl(plan.id)
    const grid: LayerGrid = new LayerGrid();
    debugger
    (plan.kind === 'cave' ? caveNucleus : hallNucleus)(grid, plan);
    const innerPearl: [number, number][][] = [grid.map((_, x, y) => [x, y])];
    const outerPearl: [number, number][][] = [];
    for (let i = 1; i < plan.pearlRadius; i++) {
      innerPearl.push(addLayer(grid, rng, plan.baroqueness, i))
    }
    for (let i = 0; i < 4; i++) {
      outerPearl.push(addLayer(grid, rng, 0, i + plan.pearlRadius))
    }
    return {...plan, innerPearl, outerPearl}
  })
  return {...cavern, plans}
}