import { Mutable } from "../../common";
import { NSEW } from "../../common/geometry";
import { MutableGrid, Grid } from "../../common/grid";
import { FinePlasticCavern } from "./03_fine";

type DiscoveryZone = {
  readonly id: number,
  readonly openOnSpawn: boolean,
}

export type DiscoveredCavern = FinePlasticCavern & {
  readonly discoveryZones: Grid<DiscoveryZone>;
};

export default function discover(cavern: FinePlasticCavern): DiscoveredCavern {
  const discoveryZones = new MutableGrid<Mutable<DiscoveryZone>>
  const queue: {x: number, y: number, zone: Mutable<DiscoveryZone> | null}[] = 
    cavern.tiles.map((_, x, y) => ({x, y, zone: null}))
  let nextZone = 0
  while (queue.length > 0) {
    let {x, y, zone} = queue.shift()!
    if (discoveryZones.get(x, y) === undefined && cavern.tiles.get(x, y)?.isWall == false) {
      if (!zone) { zone = {id: nextZone++, openOnSpawn: false} }
      discoveryZones.set(x, y, zone)
      const neighbors = NSEW.map(([ox, oy]) => ({x: x + ox, y: y + oy, zone}))
      queue.unshift(...neighbors)
    }
  }
  return {...cavern, discoveryZones}
}