import { Point } from "../../common/geometry";
import { FencedCavern } from "../../transformers/02_plastic/07_fence";

type VarType<T extends string> = {
  [p in T]: string;
};

export function mkVars<T extends string>(
  prefix: string,
  keys: readonly T[],
): VarType<T> {
  const r: Partial<VarType<T>> = {};
  keys.forEach((k) => (r[k] = `${prefix}_${String(k)}`));
  return r as VarType<T>;
}

export function transformPoint(cavern: FencedCavern, [x, y]: Point): string {
  return `${y + cavern.top},${x + cavern.left}`;
}
