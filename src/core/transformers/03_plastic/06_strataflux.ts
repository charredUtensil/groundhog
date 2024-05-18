import { PseudorandomStream } from "../../common";
import { NSEW, Point } from "../../common/geometry";
import { Grid, MutableGrid } from "../../common/grid";
import { StrataformedCavern } from "./05_strataform";

const HEIGHT_MIN = 0;
const HEIGHT_MAX = 100;

const FENCES = [
  [-1, -1],
  [0, -1],
  [-1, 0],
  [0, 0],
] as const;

type PointInfo = {
  readonly target: number | undefined;
  readonly x: number;
  readonly y: number;
  readonly localMin: boolean;
  readonly neighbors: {info: PointInfo, ascent: number, descent: number}[]
  collapseQueued: boolean;
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

function getTileSlopes(cavern: StrataformedCavern): Grid<number> {
  const result = new MutableGrid<number>();
  for (let x = cavern.left; x < cavern.right; x++) {
    for (let y = cavern.top; y < cavern.bottom; y++) {
      const forTile = cavern.tiles.get(x, y)?.maxSlope ?? 20;
      const forErosion = cavern.erosion.get(x, y) ? 0 : Infinity;
      result.set(x, y, Math.min(forTile, forErosion));
    }
  }
  return result
}

function getRandomHeight(info: PointInfo, rng: PseudorandomStream): number {
  if (info.min === info.max) {
    return info.min;
  }
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

  const tileSlopes = getTileSlopes(cavern);
  const infos = new MutableGrid<PointInfo>();
  for (let x = cavern.left; x <= cavern.right; x++) {
    for (let y = cavern.top; y <= cavern.bottom; y++) {
      infos.set(x, y, {
        target: cavern.height.get(x, y),
        x,
        y,
        localMin: !!FENCES.some(([ox, oy]) => (
          cavern.tiles.get(x + ox, y + oy)?.isFluid
          || cavern.erosion.get(x + ox, y + oy)
        )),
        neighbors: [],
        collapseQueued: false,
        min: HEIGHT_MIN,
        max: HEIGHT_MAX,
        range: HEIGHT_MAX - HEIGHT_MIN,
      });
    }
  }

  for (let x = cavern.left; x <= cavern.right; x++) {
    for (let y = cavern.top; y <= cavern.bottom; y++) {
      const info = infos.get(x, y)!;
      const [ni, si, ei, wi] = NSEW.map(([ox, oy]) => infos.get(x + ox, y + oy));
      const [nw, ne, sw, se] = FENCES.map(([ox, oy]) => tileSlopes.get(x + ox, y + oy) ?? Infinity);
      ([
        [ni, Math.min(nw, ne)],
        [si, Math.min(sw, se)],
        [ei, Math.min(ne, se)],
        [wi, Math.min(nw, sw)],
      ] as [PointInfo | undefined, number][]).forEach(([ai, slope]) =>  {
        if (ai) {
          info.neighbors.push({
            info: ai,
            ascent: ai.localMin ? 0 : slope,
            descent: info.localMin ? 0 : slope,
          })
        }
      })
    }
  }

  const collapseQueue: PointInfo[] = [
    infos.get(...cavern.plans.find(plan => plan.hops === 0)!.innerPearl[0][0])!
  ];
  collapseQueue[0].collapseQueued = true;

  const height = new MutableGrid<number>();
  const rng = cavern.dice.height;
  const collapse = () => {
    const info = collapseQueue.pop()!;
    const h = getRandomHeight(info, rng);
    height.set(info.x, info.y, h);
    info.min = h;
    info.max = h;
    info.range = 0;
    return info;
  };

  while (collapseQueue.length) {
    const effectQueue = [collapse()];
    for (let i = 0; i < effectQueue.length; i++) {
      const info = effectQueue.shift()!;
      for (let j = 0; j < info.neighbors.length; j++) {
        const neighbor = info.neighbors[j];
        if (!neighbor.info.range) {
          continue;
        }
        neighbor.info.min = Math.max(neighbor.info.min, info.min - neighbor.descent);
        neighbor.info.max = Math.min(neighbor.info.max, info.max + neighbor.ascent);
        const range = neighbor.info.max - neighbor.info.min;
        if (range < neighbor.info.range) {
          neighbor.info.range = range;
          effectQueue.push(neighbor.info);
          if (!neighbor.info.collapseQueued) {
            neighbor.info.collapseQueued = true;
            collapseQueue.push(neighbor.info);
          }
        }
      }
    }
    collapseQueue.sort(sortFn);
  }
  debugger;

  return {...cavern, height};
}