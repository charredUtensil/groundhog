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
  return `${y - cavern.top},${x - cavern.left}`;
}

export function scriptFragment(...rest: (string | false | null | undefined)[]) {
  return rest.filter(s => s).join('\n')
}

export function eventChain(name: string, ...rest: (string | false | null | undefined)[]) {
  return `${name}::;\n${scriptFragment(...rest)}\n`
}