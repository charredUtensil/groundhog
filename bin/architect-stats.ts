#!/usr/bin/env node
import 'dotenv/config';
import { inferContextDefaults } from "../src/core/common";
import { CAVERN_TF } from "../src/core/transformers";
import { AnyTfResultOf } from '../src/core/common/transform';
import { CollapseUnion } from '../src/core/common/utils';
import { MAX_PLUS_ONE } from '../src/core/common/prng';
import { ARCHITECTS } from '../src/core/architects';

type Concordance = {[K: string]: number}

function gen(seed: number): Concordance {
  let state = CAVERN_TF.first({
    initialContext: inferContextDefaults({seed}),
  });
  
  function check(): Concordance | null {
    const cavern: CollapseUnion<AnyTfResultOf<typeof CAVERN_TF>> = state.result;
    if (!cavern.plans) {
      return null;
    }
    const r: Concordance = {};
    for (var i = 0; i < cavern.plans.length; i++) {
      const plan: NonNullable<(typeof cavern)['plans']>[number] = cavern.plans[i];
      if (!('architect' in plan && plan.architect)) {
        return null;
      }
      const name = plan.architect.name;
      r[name] = (r[name] ?? 0) + 1;
    }
    return r;
  }

  while (state.next) {
    state = state.next();
    const r = check();
    if (r) {
      return r;
    }
  }
  throw new Error('Ended without architects somehow');
}

type Stats = {[K: string]: number[]};

function draw(stats: Stats, count: number) {
  const width = 50;
  const columnCount = 4;
  const nameWidth = width - columnCount * 5;
  const chartLines = ARCHITECTS.map(a => {
    const cols = (stats[a.name] ?? []).filter((_, i) => i < columnCount).map(c => `${(c / count * 100).toFixed().padStart(3)}%`).join(' ');
    return `${a.name.padEnd(nameWidth,'.').substring(0, nameWidth)} ${cols}`.padEnd(width);
  });

  const mid = Math.ceil(chartLines.length / 2);
  const header1 = `${'architect'.padEnd(nameWidth)} ${new Array(columnCount).fill(0).map((_, i) => ` >=${i + 1}`).join(' ')}`
  const header2 = `${''.padEnd(nameWidth, '-')} ${new Array(columnCount).fill(0).map(() => '----').join(' ')}`
  const chart = new Array(mid).fill(0).map((_, i) => `${chartLines[i]} | ${chartLines[i + mid] ?? ''}`).join('\n');
  const footer = `Maps tested: ${count}`
  console.clear();
  console.log(`${header1} | ${header1}\n${header2} + ${header2}\n${chart}\n${footer}`);
}

function main() {
  const firstSeed = 0xEFE63E54;
  const mapsToTest = 10000;
  const stats: Stats = {};
  for (var i = 0; i < mapsToTest; i++) {
    const m = gen((firstSeed + i) % MAX_PLUS_ONE);
    for (const k of Object.keys(m)) {
      const v = m[k];
      const a = (stats[k] ||= []);
      for (var j = 0; j < v; j++) {
        a[j] = (a[j] ?? 0) + 1;
      }
    }
    if (i % 32 === 0) {
      draw(stats, i + 1);
    }
  }
  draw(stats, mapsToTest);
}

main();