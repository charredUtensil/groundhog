import { BaseState, PgArgs, PgNodeArgs, TextFn } from "./base";
import { PgNode } from "./builder";

export function listOfAny<StateT extends BaseState, FormatT>({pg, separator = ',', conjunction = 'and'}: {pg: PgArgs<StateT, FormatT>['pg'], separator?: string, conjunction?: string}, arg: PgNodeArgs<StateT, FormatT>[number], ...args: PgNodeArgs<StateT, FormatT>) {
  const sepFn: TextFn<FormatT> = ({chosen, index}) => {
    for (let i = index + 1; i < chosen.length; i++) {
      if (chosen[i] === sepFn) {
        return separator;
      }
    }
    return conjunction;
  };
  return args.reduce((r: PgNode<StateT, FormatT>, n) => pg(r, n, r.then(sepFn).then(n)), pg(arg));
}