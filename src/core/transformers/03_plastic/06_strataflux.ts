import { PseudorandomStream } from "../../common";
import { NSEW, Point } from "../../common/geometry";
import { Grid, MutableGrid } from "../../common/grid";
import { StrataformedCavern } from "./05_strataform";

const HEIGHT_MIN = 0;
const HEIGHT_MAX = 100;

type PointInfo = {
  readonly target: number | undefined;
  min: number;
  max: number;
  range: number;
};

const sortFn = (
  [{range: a}]: [PointInfo, number, number],
  [{range: b}]: [PointInfo, number, number],
) => b - a;

function getSlopes(cavern: StrataformedCavern): Grid<number> {
  const result = new MutableGrid<number>();
  for (let x = cavern.left; x < cavern.right; x++) {
    for (let y = cavern.top; y < cavern.bottom; y++) {
      const forTile = cavern.tiles.get(x, y)?.maxSlope ?? 20;
      const forErosion = cavern.erosion.get(x, y) ? 0 : Infinity;
      result.set(x, y, Math.min(forTile, forErosion));
    }
  }
  return result;
}

function getRandomHeight(info: PointInfo, rng: PseudorandomStream): number {
  const targetInRange = (() => {
    if (info.target === undefined) {
      return 0.5;
    }
    if (info.target <= info.min) {
      return 0;
    }
    if (info.target >= info.max) {
      return 1;
    }
    return (info.target - info.min) / (info.max - info.min);
  })();
  return rng.betaInt({
    a: 1 + 3 * targetInRange,
    b: 1 + 3 * (1 - targetInRange),
    min: info.min,
    max: info.max + 1,
  });
}

export default function strataflux(cavern: StrataformedCavern): StrataformedCavern {
  const slopes = getSlopes(cavern);
  const height = new MutableGrid<number>();
  const rq = new MutableGrid<PointInfo>();
  const inOrder: [PointInfo, number, number][] = [];

  const [startX, startY] = cavern.plans.find(plan => plan.hops === 0)!.innerPearl[0][0];

  for (let x = cavern.left; x <= cavern.right; x++) {
    for (let y = cavern.top; y <= cavern.bottom; y++) {
      const info: PointInfo = {
        target: cavern.height.get(x, y),
        min: HEIGHT_MIN,
        max: HEIGHT_MAX,
        range: HEIGHT_MAX - HEIGHT_MIN
      };
      rq.set(x, y, info);
      if (x === startX && y === startY) {
        inOrder.unshift([info, x, y]);
      } else {
        inOrder.push([info, x, y])
      }
    }
  }

  const rng = cavern.dice.height;

  while (inOrder.length) {
    const uq = [(() => {
      const [info, ...pos] = inOrder.pop()!;
      const h = getRandomHeight(info, rng);
      height.set(...pos, h);
      info.min = h;
      info.max = h;
      info.range = 0;
      return [info, ...pos] as [PointInfo, ...Point];
    })()];

    while (uq.length) {
      const [info, x, y] = uq.shift()!;
      NSEW.forEach(([ox, oy]) => {
        const nInfo = rq.get(x + ox, y + oy);
        if (!nInfo || !nInfo.range) {
          return
        }
        //  x0 y0  x1 y1  x2 y2
        //   0 -1  -1 -1   0 -1
        //   0  1  -1  0   0  0
        //  -1  0  -1 -1  -1  0
        //   1  0   0 -1   0  0
        const slope = Math.min(
          slopes.get(
            ox === 1 ? x : x - 1,
            oy === 1 ? y : y - 1,
          ) ?? Infinity,
          slopes.get(
            ox === -1 ? x - 1 : x,
            oy === -1 ? y - 1 : y,
          ) ?? Infinity,
        );
        nInfo.min = Math.max(nInfo.min, info.min - slope);
        nInfo.max = Math.min(nInfo.max, info.max + slope);
        const range = nInfo.max - nInfo.min;
        if (range < nInfo.range) {
          nInfo.range = range;
          uq.push([nInfo, x + ox, y + oy]);
        }
      });
    }

    inOrder.sort(sortFn);
  }

  return {...cavern, height};
}