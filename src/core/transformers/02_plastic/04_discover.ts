import { Grid } from "../../common/grid";
import { CavernWithDiscoveryZones, CavernWithPlansAndDiorama } from "../../models/cavern";

const NSEW: ReadonlyArray<readonly [number, number]> = [
  [0, -1],
  [0, 1],
  [-1, 0],
  [1, 0],
];

export default function discover(cavern: CavernWithPlansAndDiorama): CavernWithDiscoveryZones {
  const discoveryZones = new Grid<number>
  const queue = cavern.diorama.tiles.map((_, x, y) => ({x, y, zone: -1}))
  let nextZone = 0
  while (queue.length > 0) {
    let {x, y, zone} = queue.shift()!
    if (discoveryZones.get(x, y) === undefined && cavern.diorama.tiles.get(x, y)?.isWall == false) {
      if (zone < 0) { zone = nextZone++ }
      discoveryZones.set(x, y, zone)
      const neighbors = NSEW.map(([ox, oy]) => ({x: x + ox, y: y + oy, zone}))
      queue.unshift(...neighbors)
    }
  }
  return {...cavern, discoveryZones}
}