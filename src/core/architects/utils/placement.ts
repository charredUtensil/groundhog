import { PseudorandomStream } from "../../common";
import { Cardinal4, NSEW } from "../../common/geometry";
import { Plan } from "../../models/plan";
import { EntityPosition, position } from "../../models/position";
import { Tile } from "../../models/tiles";
import { StrataformedCavern } from "../../transformers/03_plastic/02_strataform";

export function pickPoint(
  plan: Plan,
  filter: (x: number, y: number) => boolean,
) {
  for (let ly = 0; ly < plan.innerPearl.length; ly++) {
    const layer = plan.innerPearl[ly];
    const start = plan.id % (layer.length - 1);
    for (let i = start; i < layer.length; i++) {
      if (filter(...layer[i])) {
        return layer[i];
      }
    }
    for (let i = 0; i < start; i++) {
      if (filter(...layer[i])) {
        return layer[i];
      }
    }
  }
  return undefined;
}

export function circumferencePositions(
  cavern: StrataformedCavern,
  plan: Plan,
  count: number,
  rng: PseudorandomStream,
  filterFn: (x: number, y: number, t: Tile) => boolean,
): EntityPosition[] {
  for (let ly = plan.innerPearl.length - 2; ly >= 0; ly--) {
    const r = positionsHelper(cavern, plan, count, rng, filterFn, ly, ly + 1);
    if (r.length) {
      return r;
    }
  }
  return [];
}

export function innerPositions(
  cavern: StrataformedCavern,
  plan: Plan,
  count: number,
  rng: PseudorandomStream,
  filterFn: (x: number, y: number, t: Tile) => boolean,
): EntityPosition[] {
  for (let ly = 1; ly < plan.innerPearl.length; ly++) {
    const r = positionsHelper(cavern, plan, count, rng, filterFn, ly, ly - 1);
    if (r.length) {
      return r;
    }
  }
  return [];
}

function positionsHelper(
  cavern: StrataformedCavern,
  plan: Plan,
  count: number,
  rng: PseudorandomStream,
  filterFn: (x: number, y: number, t: Tile) => boolean,
  ly: number,
  aly: number,
): EntityPosition[] {
  const placements = plan.innerPearl[ly]
    .map(([x, y]) => {
      const t = cavern.tiles.get(x, y);
      if (
        t?.isWall !== false ||
        !filterFn(x, y, t) ||
        cavern.pearlInnerDex.get(x, y)?.some(
          (_, i) => i !== plan.id && cavern.plans[i].kind !== 'hall')
      ) {
        return null;
      }
      const anchor = NSEW.find(([ox, oy]) => (
        cavern.tiles.get(x + ox, y + oy)?.isWall &&
        cavern.pearlInnerDex.get(x + ox, y + oy)?.[plan.id] === aly
      ));
      if (!anchor) {
        return null;
      }
      return [x, y, anchor];
    })
    .filter(n => n) as [number, number, Cardinal4][];
  return rng.shuffle(placements)
    .filter((_, i) => i < count)
    .map(([tx, ty, [ax, ay]]) => {
      const x = tx + rng.uniform({max: ax === 0 ? 1 : 0.25}) + (ax > 0 ? 0.75 : 0);
      const y = ty + rng.uniform({max: ay === 0 ? 1 : 0.25}) + (ay > 0 ? 0.75 : 0);
      const fx = tx + (ax === 0 ? rng.uniform({min: -2, max: 2}) : ax * -5);
      const fy = ty + (ay === 0 ? rng.uniform({min: -2, max: 2}) : ay * -5);
      return position({x, y, aimedAt: [fx, fy]});
    });
}