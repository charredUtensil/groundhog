type TfResult<T, Current extends T> = {
  result: Current;
  name: string;
  progress: number;
  next: (() => TfResult<T, any>) | null;
};

export type TransformResult<T> = TfResult<T, any>;

export type AnyTfResultOf<BT extends TfBuilder<any, any, any>> =
  BT extends TfBuilder<infer T, any, any> ? T : unknown;

class TfBuilder<T, In extends T, Out extends T> {
  private fns: ((it: T) => T)[];
  constructor(fns: ((it: T) => T)[]) {
    this.fns = fns;
  }
  private mkResult<Current extends T>(
    result: Current,
    i: number,
  ): TfResult<T, Current> {
    const name = [
      `${i}/${this.fns.length}`,
      this.fns[i - 1]?.name ?? "init",
      i < this.fns.length ? `(next: ${this.fns[i].name})` : undefined,
    ].join(" ");
    const progress = i / this.fns.length;
    const next =
      i < this.fns.length
        ? () => this.mkResult(this.fns[i](result), i + 1)
        : null;
    return { result, name, progress, next };
  }
  first(result: In): TfResult<T, In> {
    return this.mkResult(result, 0);
  }
  chain<ThatT, ThatOut extends ThatT>(
    that: TfBuilder<ThatT | Out, Out, ThatOut>,
  ): TfBuilder<T | ThatT, In, ThatOut> {
    return new TfBuilder([
      ...(this.fns as ((it: T | ThatT) => T | ThatT)[]),
      ...(that.fns as ((it: T | ThatT) => T | ThatT)[]),
    ]);
  }
  then<ThatOut>(fn: (it: Out) => ThatOut): TfBuilder<T | ThatOut, In, ThatOut> {
    return new TfBuilder([
      ...(this.fns as ((it: T | ThatOut) => T | ThatOut)[]),
      fn as (it: T | ThatOut) => T | ThatOut,
    ]);
  }
}

export function tf<TIn, TOut>(fn: (it: TIn) => TOut) {
  const fns = [fn as (it: TIn | TOut) => TIn | TOut];
  return new TfBuilder<TIn | TOut, TIn, TOut>(fns);
}
