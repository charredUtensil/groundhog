export type GetOrUndefined<T extends object, K extends string | number | symbol> = 
  T extends T ? (K extends keyof T ? T[K] : undefined) : undefined;
export type KeyOfUnion<T> = T extends T ? keyof T: never;
export type Mutable<T> = { -readonly [P in keyof T]: T[P] };

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
