import { Mutable } from "../common";
import { NEIGHBORS8, Point } from "../common/geometry";
import { Grid, MutableGrid } from "../common/grid";
import { Tile } from "./tiles";

export type DiscoveryZone = {
  readonly id: number;
  readonly openOnSpawn: boolean;
  readonly triggerPoint: Point;
};

export function getDiscoveryZones(tiles: Grid<Tile>) {
  const result = new MutableGrid<Mutable<DiscoveryZone>>();
  const queue: { x: number; y: number; zone: Mutable<DiscoveryZone> | null }[] =
    tiles.map((_, x, y) => ({ x, y, zone: null }));
  let nextZone = 0;
  while (queue.length > 0) {
    // eslint-disable-next-line prefer-const
    let { x, y, zone } = queue.shift()!;
    if (result.get(x, y) === undefined && tiles.get(x, y)?.isWall === false) {
      if (!zone) {
        zone = { id: nextZone++, openOnSpawn: false, triggerPoint: [x, y] };
      }
      result.set(x, y, zone);
      const neighbors = NEIGHBORS8.map(([ox, oy]) => ({
        x: x + ox,
        y: y + oy,
        zone,
      }));
      queue.unshift(...neighbors);
    }
  }
  return result;
}
