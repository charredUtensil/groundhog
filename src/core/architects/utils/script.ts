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
export type EventChainLine = `${string};` | Falsy;

export function scriptFragment(...rest: (string | Falsy)[]) {
  return rest.filter((s) => s).join("\n");
}

export function eventChain(name: string, ...rest: EventChainLine[]) {
  return `${name}::;\n${scriptFragment(...rest)}\n`;
}

export function escapeString(s: string) {
  return s.replace(/\\/g, "").replace(/"/g, '\\"');
}

export class ScriptHelper {
  private _uid: number = 0;

  trigger(condition: `${'if' | 'when'}(${string})`, ...rest: EventChainLine[]) {
    const name = `ec${this._uid++}`;
    return `${condition}[${name}]\n${eventChain(name, ...rest)}`
  }
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
