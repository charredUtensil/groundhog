import { PgNode } from "./builder";

export type BaseState = { [key: string]: boolean };

export type TextFn<FormatT> = (args: {
  chosen: readonly (TextFn<FormatT> | null)[];
  index: number;
  format: FormatT;
}) => string;

export type Phrase<StateT extends BaseState, FormatT> = {
  readonly id: number;
  readonly text: readonly TextFn<FormatT>[];
  readonly after: Phrase<StateT, FormatT>[];
  readonly before: Phrase<StateT, FormatT>[];
  readonly requires: (string & keyof StateT) | "start" | "end" | null;
  readonly reachableStates: Set<bigint>;
};

export type PgNodeArgs<StateT extends BaseState, FormatT> = (
  | PgNode<StateT, FormatT>
  | TextFn<FormatT>
  | string
)[];

export type PgArgs<StateT extends BaseState, FormatT> = {
  pg: (...args: PgNodeArgs<StateT, FormatT>) => PgNode<StateT, FormatT>;
  state: (...args: (string & keyof StateT)[]) => PgNode<StateT, FormatT>;
  start: PgNode<StateT, FormatT>;
  end: PgNode<StateT, FormatT>;
  cut: PgNode<StateT, FormatT>;
  skip: PgNode<StateT, FormatT>;
};
