import { PseudorandomStream } from "../../common";
import { NSEW, Point } from "../../common/geometry";
import { Grid, MutableGrid } from "../../common/grid";
import { StrataformedCavern } from "./05_strataform";

const HEIGHT_MIN = 0;
const HEIGHT_MAX = 100;

const FENCES = [
  [-1, -1],
  [-1, 0],
  [0, -1],
  [0, 0],
] as const;

type PointInfo = {
  readonly target: number | undefined;
  readonly x: number;
  readonly y: number;
  min: number;
  max: number;
  range: number;
};

function superflat(cavern: StrataformedCavern): Grid<number> {
  const result = new MutableGrid<number>();
  for (let x = cavern.left; x <= cavern.right; x++) {
    for (let y = cavern.top; y <= cavern.bottom; y++) {
      result.set(x, y, 0);
    }
  }
  return result;
}

const sortFn = (
  {range: a}: PointInfo,
  {range: b}: PointInfo,
) => b - a;

function getShores(cavern: StrataformedCavern): Grid<boolean> {
  const result = new MutableGrid<boolean>();
  for (let x = cavern.left; x <= cavern.right; x++) {
    for (let y = cavern.top; y <= cavern.bottom; y++) {
      result.set(x, y, !!FENCES.some(([ox, oy]) => (
        cavern.tiles.get(x + ox, y + oy)?.isFluid || cavern.erosion.get(x + ox, y + oy)
      )));
    }
  }
  return result;
}

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
  if (!cavern.context.hasHeightMap) {
    return {...cavern, height: superflat(cavern)};
  }

  const shores = getShores(cavern);
  const slopes = getSlopes(cavern);
  const height = new MutableGrid<number>();
  const rq = new MutableGrid<PointInfo>();
  const inOrder: PointInfo[] = [];

  const [startX, startY] = cavern.plans.find(plan => plan.hops === 0)!.innerPearl[0][0];

  for (let x = cavern.left; x <= cavern.right; x++) {
    for (let y = cavern.top; y <= cavern.bottom; y++) {
      const info: PointInfo = {
        target: cavern.height.get(x, y),
        x,
        y,
        min: HEIGHT_MIN,
        max: HEIGHT_MAX,
        range: HEIGHT_MAX - HEIGHT_MIN,
      };
      rq.set(x, y, info);
      if (x === startX && y === startY) {
        inOrder.unshift(info);
      } else {
        inOrder.push(info)
      }
    }
  }

  const rng = cavern.dice.height;
  const visit = () => {
    const info = inOrder.pop()!;
    const h = getRandomHeight(info, rng);
    height.set(info.x, info.y, h);
    info.min = h;
    info.max = h;
    info.range = 0;
    return info;
  };

  while (inOrder.length) {
    const uq = [visit()];

    while (uq.length) {
      const info = uq.shift()!;
      const x = info.x;
      const y = info.y;
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
        nInfo.min = Math.max(nInfo.min, shores.get(x, y) ? info.min : info.min - slope);
        nInfo.max = Math.min(nInfo.max, shores.get(x + ox, y + oy) ? info.max : info.max + slope);
        const range = nInfo.max - nInfo.min;
        if (range < nInfo.range) {
          nInfo.range = range;
          uq.push(nInfo);
        }
      });
    }

    inOrder.sort(sortFn);
  }

  return {...cavern, height};
}