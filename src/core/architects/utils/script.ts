import { Point } from "../../common/geometry";
import { DiscoveryZone } from "../../models/discovery_zone";
import { FencedCavern } from "../../transformers/03_plastic/00_fence";

type VarPrefix = `g${string}` | `p${number}${string}`
type VarName = `${VarPrefix}_${string}`
type VarType<T extends string> = {
  [p in T]: VarName;
};

export function mkVars<T extends string>(
  prefix: VarPrefix,
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

function scriptFragment(...rest: (string | Falsy)[]) {
  return rest.filter((s) => s).join("\n");
}

function eventChain(name: VarName, ...rest: (`${string};` | Falsy)[]) {
  return `${name}::;\n${scriptFragment(...rest)}\n`;
}

function escapeString(s: string) {
  return s.replace(/\\/g, "").replace(/"/g, '\\"');
}

export class ScriptBuilder {
  readonly defs: string[] = [];
  readonly discover: VarName[][] = [];
  readonly discoverBlocking: {chain: VarName, priority: number}[] = [];
  readonly chains: string[] = [];
  readonly triggers: string[] = [];
  
  defineInt(name: VarName, value: number) {
    this.defs.push(`int ${name}=${value.toFixed(0)}`);
  }

  defineString(name: VarName, value: string) {
    this.defs.push(`string ${name}="${escapeString(value)}"`);
  }

  onDiscover(dz: DiscoveryZone, chain: VarName) {
    (this.discover[dz.id] ||= []).push(chain);
  }

  onDiscoverBlocking(dz: DiscoveryZone, chain: VarName, priority: number) {
    if ((this.discoverBlocking[dz.id].priority ?? -1) < priority) {
      this.discoverBlocking[dz.id] = {chain, priority};
    }
  }

  iif(trigger: string, chain: VarName) {
    this.triggers.push(`if(${trigger})[${chain}]`);
  }

  when(trigger: string, chain: VarName) {
    this.triggers.push(`when(${trigger})[${chain}]`);
  }

  eventChain(name: VarName, ...rest: (`${string};` | Falsy)[]) {
    this.chains.push(eventChain(name, ...rest));
  }
}
