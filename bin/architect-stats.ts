#!/usr/bin/env node

// This script generates a large number of caverns until architects have been
// assigned, then reports statistics on how common the architects are.

import "dotenv/config";
import { inferContextDefaults } from "../src/core/common";
import { CAVERN_TF } from "../src/core/transformers";
import { AnyTfResultOf } from "../src/core/common/transform";
import { CollapseUnion } from "../src/core/common/utils";
import { MAX_PLUS_ONE } from "../src/core/common/prng";
import { ARCHITECTS } from "../src/core/architects";
import { Architect } from "../src/core/models/architect";

type Concordance = { [K: string]: number };

function gen(seed: number): Concordance {
  let state = CAVERN_TF.first({
    initialContext: inferContextDefaults({ seed }),
  });

  function check(): Concordance | null {
    const cavern: CollapseUnion<AnyTfResultOf<typeof CAVERN_TF>> = state.result;
    if (!cavern.plans) {
      return null;
    }
    const r: Concordance = {};
    for (var i = 0; i < cavern.plans.length; i++) {
      const plan: NonNullable<(typeof cavern)["plans"]>[number] =
        cavern.plans[i];
      if (!("architect" in plan && plan.architect)) {
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
  throw new Error("Ended without architects somehow");
}

function fgColor(a: Architect<any>) {
  if (a.anchorBid) {
    return 205;
  } else if (a.scriptGlobals || a.script) {
    return 45;
  } else if (a.hallBid) {
    return 228;
  } else {
    return 255;
  }
}

type Stats = { [K: string]: number[] };

function draw(stats: Stats, count: number) {
  const width = 50;
  const columnCount = 4;
  const nameWidth = width - columnCount * 5;
  const chartLines = ARCHITECTS.map((a, i) => {
    const rowColor = `\x1b[38;5;${fgColor(a)};48;5;${i % 2 === 0 ? 232 : 234}m`;
    const name = a.name.padEnd(nameWidth, ".").substring(0, nameWidth);
    const cols = new Array(columnCount).fill(0)
      .map((_, i) => (stats[a.name] ?? [])[i] ?? 0)
      .map((c) => {
        if (c <= 0) {
          return '    ';
        }
        const ratio = c / count
        const color = `\x1b[38;5;${Math.round(15 * ratio + 240)}m`;
        if (ratio < 0.05) {
          return `${color}${(ratio * 100).toFixed(1)}%`;
        }
        return `${color}${(ratio * 100).toFixed().padStart(3)}%`;
      })
      .join(" ");
    return `${rowColor}${name} ${cols}\x1b[m`;
  });

  const mid = Math.ceil(chartLines.length / 2);
  const header1 = `${"architect".padEnd(nameWidth)} ${new Array(columnCount)
    .fill(0)
    .map((_, i) => ` >=${i + 1}`)
    .join(" ")}`;
  const header2 = `${"".padEnd(nameWidth, "-")} ${new Array(columnCount)
    .fill(0)
    .map(() => "----")
    .join(" ")}`;
  const chart = new Array(mid)
    .fill(0)
    .map((_, i) => `${chartLines[i]} | ${chartLines[i + mid] ?? ""}`)
    .join("\n");
  const footer = `Maps tested: ${count}`;
  console.clear();
  console.log(
    `${header1} | ${header1}\n${header2} + ${header2}\n${chart}\n${footer}`,
  );
}

function main() {
  const firstSeed = 0xefe63e54;
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
