import { Grid, MutableGrid } from "../../common/grid";
import { RoughPlasticCavern } from "./01_rough";
import { RoughTile, Tile } from "../../models/tiles";
import { Cardinal4, EAST, NORTH, NSEW, Point } from "../../common/geometry";
import { DiscoveryZone, getDiscoveryZones } from "../../models/discovery_zone";
import { PseudorandomStream } from "../../common";

function pickNeighborOffset(
  tiles: MutableGrid<RoughTile>,
  x: number,
  y: number,
  discoveryZones: Grid<DiscoveryZone>,
  rng: PseudorandomStream,
): Cardinal4 | null {
  if (!(tiles.get(x, y)?.isWall ?? true)) {
    // This tile is not a wall.
    return null;
  }

  // Find the directions that there are adjacent walls.
  const neighborWalls = NSEW.filter(
    ([ox, oy]) => tiles.get(x + ox, y + oy)?.isWall ?? true,
  );

  switch (neighborWalls.length) {
    case 0:
      // Make a random tile dirt so there's 1 neighbor.
      const r = rng.uniformChoice(NSEW)
      tiles.set(x + r[0], y + r[1], Tile.DIRT);
      return r;
    case 1:
      return neighborWalls[0]
    case 2:
      // If there are two walls, find the discovery zones of the neighbors.
      const [zn, zs, ze, zw] = NSEW.map(
        ([ox, oy]) => !(tiles.get(x + ox, y + oy)?.isWall) && discoveryZones.get(x + ox, y + oy)
      )
      // If there are two tiles on opposite sides that are not walls and they
      // belong to the same discovery zone, this wall would collapse
      // immediately under all circumstances.
      if ((zn && zn === zs) || (ze && ze === zw)) {
        return rng.uniformChoice(neighborWalls);
      }
      // Otherwise, this tile is fine as-is.
      return null;
    default:
      // This tile has 3 or 4 neighbors, so it's fine.
      return null
  }
}

function apply(tiles: MutableGrid<RoughTile>, [x, y]: Point, [ox, oy]: Cardinal4) {
  // Face the wall neighbor and move right.
  x -= oy;
  y += ox;
  tiles.set(x, y, Tile.DIRT);

  // Move forward.
  x += ox;
  y += oy;
  if (tiles.get(x, y)?.isWall === false) {
    tiles.set(x, y, Tile.DIRT);
  }
}

export default function patch(cavern: RoughPlasticCavern): RoughPlasticCavern {
  const rng = cavern.dice.patch
  const tiles = cavern.tiles.copy();
  const discoveryZones = getDiscoveryZones(tiles);
  const bounds = tiles.bounds;
  for (let x = bounds.left; x < bounds.right; x++) {
    for (let y = bounds.top; y < bounds.bottom; y++) {
      const neighbor = pickNeighborOffset(tiles, x, y, discoveryZones, rng);
      if (neighbor) {
        apply(tiles, [x, y], neighbor)
      }
    }
  }
  return { ...cavern, tiles };
}
