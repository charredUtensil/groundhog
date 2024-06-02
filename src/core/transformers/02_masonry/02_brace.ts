import { MutableGrid } from "../../common/grid";
import { RoughPlasticCavern } from "./01_rough";
import { Tile } from "../../models/tiles";
import { Cardinal4, NSEW } from "../../common/geometry";
import { getDiscoveryZones } from "../../models/discovery_zone";

export default function brace(cavern: RoughPlasticCavern): RoughPlasticCavern {
  const rng = cavern.dice.brace;
  const tiles = cavern.tiles.copy();
  const discoveryZones = getDiscoveryZones(tiles);
  const visited: MutableGrid<true> = new MutableGrid();
  const queue: { x: number; y: number; facing: Cardinal4 | null }[] =
    tiles.flatMap((_, x, y) => [
      { x, y, facing: null },
      ...NSEW.map((f) => ({ x: x + f[0], y: y + f[1], facing: null })),
    ]);
  while (queue.length) {
    const { x, y, facing } = queue.pop()!;
    if (!visited.get(x, y) && (tiles.get(x, y)?.isWall ?? true)) {
      const neighbors = NSEW.map((f) => ({
        x: x + f[0],
        y: y + f[1],
        facing: f,
      }));
      const wallNeighbors = neighbors.filter(
        ({ x, y }) => tiles.get(x, y)?.isWall ?? true,
      );

      if (!wallNeighbors.length) {
        const n = rng.uniformChoice(neighbors);
        tiles.set(n.x, n.y, Tile.DIRT);
        wallNeighbors.push(n);
      }

      const needsBrace = () => {
        if (wallNeighbors.length === 2) {
          const [a, b] = wallNeighbors;
          return (
            (a.x === b.x || a.y === b.y) &&
            discoveryZones.get(a.x, a.y) === discoveryZones.get(b.x, b.y)
          );
        }
        return wallNeighbors.length < 2;
      };

      if (needsBrace()) {
        const [ox, oy] = facing || wallNeighbors[0].facing.map((v) => -v);
        const n = { x: x - oy, y: y + ox, facing: [-oy, ox] as Cardinal4 };
        tiles.set(n.x, n.y, Tile.DIRT);
        wallNeighbors.push(n);
      }

      visited.set(x, y, true);
      queue.push(...wallNeighbors.filter(({ x, y }) => tiles.get(x, y)));
    }
  }
  return { ...cavern, tiles };
}
