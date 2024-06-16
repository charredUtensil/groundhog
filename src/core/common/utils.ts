export type Mutable<T> = { -readonly [P in keyof T]: T[P] };

type GetOrUndefined<
  T extends object,
  K extends string | number | symbol,
> = T extends T ? (K extends keyof T ? T[K] : undefined) : never;
type KeyOfUnion<T> = T extends T ? keyof T : never;
type UndefinedToOptional<T> = {
  [K in keyof T]-?: (
    x: undefined extends T[K] ? { [P in K]?: T[K] } : { [P in K]: T[K] },
  ) => void;
}[keyof T] extends (x: infer I) => void
  ? I extends infer U
    ? { [K in keyof U]: U[K] }
    : never
  : never;
export type CollapseUnion<T extends object> = UndefinedToOptional<{
  [K in KeyOfUnion<T>]: GetOrUndefined<T, K>;
}>;

export function pairEach<T>(
  it: readonly T[],
  fn: (a: T, b: T, i: number) => void,
) {
  for (let i = 0; i < it.length - 1; i++) {
    fn(it[i], it[i + 1], i);
  }
}
export function pairMap<U, V>(
  it: readonly U[],
  fn: (a: U, b: U, i: number) => V,
): V[] {
  const result: V[] = [];
  pairEach(it, (a, b, i) => result.push(fn(a, b, i)));
  return result;
}

export function filterTruthy<T>(it: (T | null | false | undefined)[]): T[] {
  return it.filter(n => n) as T[];
}