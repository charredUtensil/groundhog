import { Point } from "../../common/geometry";
import { FencedCavern } from "../../transformers/03_plastic/00_fence";

type VarType<T extends string> = {
  [p in T]: string;
};

export function mkVars<T extends string>(
  prefix: string,
  keys: readonly T[],
): VarType<T> {
  const r: Partial<VarType<T>> = {};
  keys.forEach((k) => (r[k] = `${prefix}_${k}`));
  return r as VarType<T>;
}

export function transformPoint(
  cavern: FencedCavern,
  [x, y]: Point,
): `${number},${number}` {
  return `${y - cavern.top},${x - cavern.left}`;
}

type Falsy = false | null | undefined;

export function scriptFragment(...rest: (string | Falsy)[]) {
  return rest.filter((s) => s).join("\n");
}

export function eventChain(name: string, ...rest: (`${string};` | Falsy)[]) {
  return `${name}::;\n${scriptFragment(...rest)}\n`;
}

export function escapeString(s: string) {
  return s.replace(/\\/g, "").replace(/"/g, '\\"');
}

export enum DzPriorities {
  CRITICAL = 0,
  OBJECTIVE,
  HINT,
  TRIVIAL,
}
