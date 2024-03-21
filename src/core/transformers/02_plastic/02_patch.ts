import { MutableGrid } from "../../common/grid";
import { RoughPlasticCavern } from "./01_rough";
import { RoughTile, Tile } from "../../models/tiles";
import { NSEW } from "../../common/geometry";

function visit(tiles: MutableGrid<RoughTile>, x: number, y: number) {
  if (!(tiles.get(x, y)?.isWall ?? true)) {
    // This tile is not a wall.
    return;
  }

  // Find the directions that there are adjacent walls.
  const neighborWalls = NSEW.filter(
    ([ox, oy]) => tiles.get(x + ox, y + oy)?.isWall ?? true,
  );

  // TODO: Find the case where this and two neighbors form a straight line
  // and both sides are in the same discovery group.

  if (neighborWalls.length > 1) {
    // This tile is supported and does not need patching.
    return;
  }

  if (neighborWalls.length == 0) {
    // This tile is alone, so make the north tile dirt.
    neighborWalls.push([0, -1]);
    tiles.set(x, y - 1, Tile.DIRT);
  }

  const [ox, oy] = neighborWalls[0];

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
  const tiles = cavern.tiles.copy();
  const bounds = tiles.bounds;
  for (let x = bounds.left; x < bounds.right; x++) {
    for (let y = bounds.top; y < bounds.bottom; y++) {
      visit(tiles, x, y);
    }
  }
  return { ...cavern, tiles };
}