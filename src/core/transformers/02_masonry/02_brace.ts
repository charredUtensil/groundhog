import { MutableGrid } from "../../common/grid";
import { RoughPlasticCavern } from "./01_rough";
import { Tile } from "../../models/tiles";
import { NSEW, offsetBy, Point } from "../../common/geometry";
import { DiscoveryZone, getDiscoveryZones } from "../../models/discovery_zone";

/*
  Each tile is part of four different possible 2x2 squares.
  If the tile is floor, it does not need to be braced.
  If the tile is part of at least one firm 2x2 square of wall, it does not need to be braced.
    track the DZs that must be conditionally undiscovered for this to be open?
  If it needs to be braced, 
 */

export default function brace(cavern: RoughPlasticCavern): RoughPlasticCavern {
  const rng = cavern.dice.brace;
  const tiles = cavern.tiles.copy();
  const discoveryZones = getDiscoveryZones(tiles);
  const done: MutableGrid<true> = new MutableGrid();

  function visit(pv: Point) {
    if (done.get(...pv)) {
      return;
    }
    if (!tiles.get(...pv)?.isWall) {
      return;
    }
    // V marks the tile at point pv. The tile has four possible squares it can
    // fit in. Look at them in this pattern, rotated to each of the four
    // possible orientations:
    //                             . W E
    //                             A V D
    //                             Z S .
    const squares = rng.shuffle(NSEW).map(([owx, owy]) => {
      const pw = offsetBy(pv, [owx, owy]);
      const pa = offsetBy(pv, [owy, -owx]);
      const ps = offsetBy(pv, [-owx, -owy]);
      const pd = offsetBy(pv, [-owy, owx]);
      const pe = offsetBy(pv, [owx - owy, owy + owx]);
      const pz = offsetBy(pv, [-owx + owy, -owy - owx]);
      const floors = [pw, pe, pd].reduce(
        (r, p) => (tiles.get(...p)?.isWall === false ? r + 1 : r),
        0,
      );
      return { pw, pa, ps, pd, pe, pz, floors };
    });
    // Sort the squares by how many floor tiles they have so the most supported
    // goes first.
    squares.sort((a, b) => a.floors - b.floors);
    for (const { pw, pa, ps, pd, pe, pz, floors } of squares) {
      // All points are already walls - nothing to do.
      if (floors === 0) {
        [pv, pw, pe, pd].forEach((p) => done.set(...p, true));
        return;
      }
      // Determine if this separates two discovery zones. If so, it doesn't
      // need to be supported.
      const dzs: DiscoveryZone[] = [];
      [pw, pe, pd, ps, pz, pa].forEach((p) => {
        if (tiles.get(...p)?.isWall === false) {
          const dz = discoveryZones.get(...p)!;
          dzs[dz.id] = dz;
        }
      });
      if (dzs.reduce((r) => r + 1, 0) > 1) {
        const [d1, d2] = dzs.filter(() => true);
        if (!d1.openOnSpawn || !d2.openOnSpawn) {
          // V sits on the boundary between two different discovery zones.
          // Because of the way DZs are calculated, it is not possible for there
          // to be more than one DZ in either contiguious group (WED/SZA) so this
          // must be actually bisecting.
          done.set(...pv, true);
          return;
        }
      }
      // This square must become wall.
      [pw, pe, pd].forEach((p) => {
        if (tiles.get(...p)?.isWall === false) {
          tiles.set(...p, Tile.DIRT);
        }
        done.set(...p, true);
      });
      done.set(...pv, true);
      return;
    }
  }

  const queue: Point[] = rng.shuffle(
    tiles.flatMap((_, x, y) =>
      [[0, 0], ...NSEW].map(([ox, oy]) => [x + ox, y + oy] satisfies Point),
    ),
  );
  queue.forEach(visit);
  return { ...cavern, tiles };
}
