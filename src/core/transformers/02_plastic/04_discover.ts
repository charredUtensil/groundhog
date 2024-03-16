import { NSEW } from "../../common/geometry";
import { MutableGrid, Grid } from "../../common/grid";
import { FinePlasticCavern } from "./03_fine";

export type DiscoveredCavern = FinePlasticCavern & {
  readonly discoveryZones: Grid<number>;
};

export default function discover(cavern: FinePlasticCavern): DiscoveredCavern {
  const discoveryZones = new MutableGrid<number>
  const queue = cavern.tiles.map((_, x, y) => ({x, y, zone: -1}))
  let nextZone = 0
  while (queue.length > 0) {
    let {x, y, zone} = queue.shift()!
    if (discoveryZones.get(x, y) === undefined && cavern.tiles.get(x, y)?.isWall == false) {
      if (zone < 0) { zone = nextZone++ }
      discoveryZones.set(x, y, zone)
      const neighbors = NSEW.map(([ox, oy]) => ({x: x + ox, y: y + oy, zone}))
      queue.unshift(...neighbors)
    }
  }
  return {...cavern, discoveryZones}
}