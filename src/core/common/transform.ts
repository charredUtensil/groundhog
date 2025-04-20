export type TfResult<T, Current extends T> = {
  readonly next: boolean;
  readonly result: Current;
  readonly completedSteps: number;
  readonly totalSteps: number;
  readonly lastStepName: string;
  readonly nextStepName: string;
};

export type AnyTfResultOf<BT extends TfBuilder<any, any, any>> =
  BT extends TfBuilder<infer T, any, any> ? T : unknown;

type Steps<T> = { fn: (it: T) => T; name: string }[];

class TfBuilder<T, In extends T, Out extends T> {
  private steps: Steps<T>;
  constructor(steps: Steps<T>) {
    this.steps = steps;
  }
  private mkResult<Current extends T>(
    result: Current,
    i: number,
  ): TfResult<T, Current> {
    const next = i < this.steps.length;
    return {
      next,
      result,
      completedSteps: i,
      totalSteps: this.steps.length,
      lastStepName: i > 0 ? this.steps[i - 1].name : "init",
      nextStepName: i < this.steps.length ? this.steps[i].name : "done",
    };
  }
  start(result: In): TfResult<T, In> {
    return this.mkResult(result, 0);
  }
  next(input: TfResult<T, any>) {
    if (input.completedSteps < this.steps.length) {
      return this.mkResult(this.steps[input.completedSteps].fn(input.result), input.completedSteps + 1);
    }
    throw new Error("Completed");
  }
  chain<ThatT, ThatOut extends ThatT>(
    that: TfBuilder<ThatT | Out, Out, ThatOut>,
  ): TfBuilder<T | ThatT, In, ThatOut> {
    return new TfBuilder([
      ...(this.steps as Steps<T | ThatT>),
      ...(that.steps as Steps<T | ThatT>),
    ]);
  }
  then<ThatOut>(
    fn: (it: Out) => ThatOut,
    name?: string,
  ): TfBuilder<T | ThatOut, In, ThatOut> {
    name ??= fn.name;
    return new TfBuilder([
      ...(this.steps as Steps<T | ThatOut>),
      { fn, name } as Steps<T | ThatOut>[number],
    ]);
  }
}

export function tf<TIn, TOut>(fn: (it: TIn) => TOut, name?: string) {
  name ??= fn.name;
  return new TfBuilder<TIn | TOut, TIn, TOut>([{ fn, name }] as Steps<
    TIn | TOut
  >);
}
