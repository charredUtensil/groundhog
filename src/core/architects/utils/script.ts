import { Point } from "../../common/geometry";
import { PseudorandomStream } from "../../common/prng";
import { FormatVars, PhraseGraph } from "../../lore/builder";
import { LoreDie, State } from "../../lore/lore";
import { FencedCavern } from "../../transformers/03_plastic/00_fence";
import { EnscribedCavern } from "../../transformers/04_ephemera/02_enscribe";

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

export function eventChainSynchronized(
  name: string,
  ...rest: (`${string};` | Falsy)[]
) {
  const semaphore = `${name}_lock`;
  return scriptFragment(
    `int ${semaphore}=0`,
    eventChain(name, `((${semaphore}==0))[${semaphore}=1][${name}_wait];`),
    `when(${semaphore}==1)[${name}_syn]`,
    eventChain(`${name}_syn`, ...rest, `${semaphore}=0;`),
    eventChain(`${name}_wait`, "wait:1;", `${name};`),
  );
}

export function escapeString(s: string) {
  return s.replace(/\\/g, "").replace(/"/g, '\\"');
}

export function declareStringFromLore<T extends { [K: string]: boolean }>(
  cavern: EnscribedCavern,
  die: PseudorandomStream | LoreDie,
  varName: string,
  pg: PhraseGraph<State & T>,
  state: T,
  formatVars: FormatVars,
) {
  const rng: PseudorandomStream =
    die instanceof PseudorandomStream ? die : cavern.dice.lore(die);
  const val = pg.generate(
    rng,
    { ...cavern.lore.state, ...state },
    { ...cavern.lore.formatVars, ...formatVars },
  ).text;
  return `string ${varName}="${escapeString(val)}"`;
}

export enum DzPriorities {
  CRITICAL = 0,
  OBJECTIVE,
  HINT,
  TRIVIAL,
}
