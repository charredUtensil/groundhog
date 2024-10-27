import { Point } from "../../common/geometry";
import { PseudorandomStream } from "../../common/prng";
import { FormatVars, PhraseGraph } from "../../lore/builder";
import { LoreDie, State } from "../../lore/lore";
import { FencedCavern } from "../../transformers/03_plastic/00_fence";
import { PreprogrammedCavern } from "../../transformers/04_ephemera/03_preprogram";

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

type Falsy = "" | false | null | undefined;
export type ScriptLine = string | Falsy;
export type EventChainLine = `${string};` | Falsy;
export type Trigger = `${"if" | "when"}(${string})`;

export function scriptFragment(...rest: EventChainLine[]): `${string};` | "";
export function scriptFragment(...rest: ScriptLine[]): string;
export function scriptFragment(...rest: ScriptLine[]) {
  return rest.filter((s) => s).join("\n") as any;
}

export function eventChain(name: string, ...rest: EventChainLine[]) {
  return `${name}::;\n${scriptFragment(...rest)}\n`;
}

export function escapeString(s: string) {
  return s.replace(/\\/g, "").replace(/"/g, '\\"');
}

type DieOrRng =
  | {
      die: LoreDie;
    }
  | {
      rng: PseudorandomStream;
    };
type FromLoreArgs = DieOrRng & {
  pg: PhraseGraph<State>;
  formatVars?: FormatVars;
};
type FromLoreArgsWithState<T> = DieOrRng & {
  pg: PhraseGraph<State & T>;
  state: T;
  formatVars?: FormatVars;
};

export type ScriptHelper = {
  declareInt(name: string, value: number): ScriptLine;
  declareString(name: string, value: string): ScriptLine;
  declareString(name: string, value: FromLoreArgs): ScriptLine;
  declareString<T>(name: string, value: FromLoreArgsWithState<T>): ScriptLine;
  trigger(
    condition: `${"if" | "when"}(${string})`,
    ...rest: EventChainLine[]
  ): string;
};

export class ScriptHelperImpl implements ScriptHelper {
  private _uid: number = 0;
  private readonly cavern: PreprogrammedCavern;

  constructor(cavern: PreprogrammedCavern) {
    this.cavern = cavern;
  }

  /**
   * Declares an integer variable.
   *
   * Note: I've explicitly decided not to use boolean vars in level scripts.
   * This is partially because I keep accidentally using constructs like
   * `if(var)` instead of `if(var==true)` but also because, at least according
   * to documentation, declaring a boolean in script actually just delcares an
   * int.
   */
  declareInt(name: string, value: number) {
    return `int ${name}=${value.toFixed()}`;
  }

  /**
   * Declares a string variable. Takes ether a string value or parameters to
   * determine the string from lore.
   */
  declareString<T>(
    name: string,
    value: string | FromLoreArgs | FromLoreArgsWithState<T>,
  ) {
    let strVal = "";
    if (typeof value === "string") {
      strVal = value;
    } else {
      const rng: PseudorandomStream =
        "rng" in value ? value.rng : this.cavern.dice.lore(value.die);
      const state = {
        ...this.cavern.lore.state,
        ...("state" in value ? value.state : {}),
      };
      const formatVars = {
        ...this.cavern.lore.formatVars,
        ...(value.formatVars ?? {}),
      };
      strVal = value.pg.generate(rng, state as any, formatVars).text;
    }
    return `string ${name}="${escapeString(strVal)}"`;
  }

  /**
   * Declares an anonymous event chain for the given trigger.
   */
  trigger(condition: Trigger, ...rest: EventChainLine[]) {
    const name = `ec${this._uid++}`;
    return `${condition}[${name}]\n${eventChain(name, ...rest)}`;
  }
}

export enum DzPriority {
  CRITICAL = 0,
  OBJECTIVE,
  HINT,
  TRIVIAL,
}
