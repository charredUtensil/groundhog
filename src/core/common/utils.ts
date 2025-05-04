/**
 * Given a readonly type, returns a shallowly mutable version of that type.
 * I have no idea why this isn't part of the Typescript standard library.
 */
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
/**
 * Given a union type T, collapse it into a partial object where each key is
 * either undefined or a valid value from any of the union types.
 */
export type CollapseUnion<T extends object> = UndefinedToOptional<{
  [K in KeyOfUnion<T>]: GetOrUndefined<T, K>;
}>;

/** Any false value. */
export type Falsy = 0 | "" | false | null | undefined;

/**
 * Executes `fn` for each adjacent pair in `it`.
 */
export function pairEach<T>(
  it: readonly T[],
  fn: (a: T, b: T, i: number) => void,
) {
  for (let i = 0; i < it.length - 1; i++) {
    fn(it[i], it[i + 1], i);
  }
}
/**
 * Executes `fn` for each adjacent pair in `it`. Returns an array of length one
 * less than the input with the results of calling the function.
 */
export function pairMap<U, V>(
  it: readonly U[],
  fn: (a: U, b: U, i: number) => V,
): V[] {
  const result: V[] = [];
  pairEach(it, (a, b, i) => result.push(fn(a, b, i)));
  return result;
}

/**
 * Given an array containing falsy values, returns an array with only the
 * truthy values.
 */
export function filterTruthy<T>(it: (T | Falsy)[]): T[] {
  return it.filter((n) => n) as T[];
}
