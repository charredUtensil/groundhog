import { BaseState, PgArgs, PgNodeArgs, TextFn } from "./base";
import { PgNode } from "./builder";

export function listJoiner<FormatT>(separator = ",", conjunction = "and") {
  const result: TextFn<FormatT> = ({ chosen, index }) => {
    for (let i = index + 1; i < chosen.length; i++) {
      if (chosen[i] === result) {
        return separator;
      }
    }
    return conjunction;
  };
  return result;
}

export function listOfAny<StateT extends BaseState, FormatT>(
  {
    pg,
    joiner,
  }: {
    pg: PgArgs<StateT, FormatT>["pg"];
    joiner?: PgNodeArgs<StateT, FormatT>[number];
  },
  arg: PgNodeArgs<StateT, FormatT>[number],
  ...args: PgNodeArgs<StateT, FormatT>
) {
  const j = joiner || listJoiner();
  return args.reduce(
    (r: PgNode<StateT, FormatT>, n) => pg(r, n, r.then(j).then(n)),
    pg(arg),
  );
}
