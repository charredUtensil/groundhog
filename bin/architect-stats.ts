#!/usr/bin/env node

// This script generates a large number of caverns until architects have been
// assigned, then reports statistics on how common the architects are.

import { inferContextDefaults } from "../src/core/common";
import { CAVERN_TF } from "../src/core/transformers";
import { AnyTfResultOf } from "../src/core/common/transform";
import { CollapseUnion, filterTruthy } from "../src/core/common/utils";
import { MAX_PLUS_ONE } from "../src/core/common/prng";
import { ARCHITECTS } from "../src/core/architects";
import { Architect } from "../src/core/models/architect";
import { getFlags } from "../src/cli/flags";

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
    for (let i = 0; i < cavern.plans.length; i++) {
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

type Stats = {
  [K: string]: {
    counts: number[];
    lastSeen: number;
    lastNotSeen: number;
  };
};
type Row = {
  name: string;
  color: string;
  saturation: string[];
  seed: string;
};

function draw(stats: Stats, count: number, totalCount: number) {
  const width = 28;
  const saturationColumnCount = 4;
  const header1: Row = {
    color: "",
    name: "architect".padEnd(width),
    saturation: Array.from(
      { length: saturationColumnCount },
      (_, i) => ` >=${i + 1}`,
    ),
    seed: "rmk  seed",
  };
  const header2: Row = {
    color: "",
    name: "".padEnd(width, "-"),
    saturation: Array.from({ length: saturationColumnCount }, () => "----"),
    seed: "---------",
  };
  const rows: Row[] = ARCHITECTS.map((architect, i) => {
    const a = stats[architect.name];
    const rowColor = `\x1b[38;5;${fgColor(architect)};48;5;${i % 2 === 0 ? 232 : 234}m`;
    const name = architect.name.padEnd(width, ".").substring(0, width);
    const saturation = Array.from({ length: saturationColumnCount }, (_, i) => {
      const c = (a.counts ?? [])[i] ?? 0;
      if (c <= 0) {
        return "    ";
      }
      const ratio = c / count;
      const color = `\x1b[38;5;${Math.round(15 * ratio + 240)}m`;
      const s = (ratio * 100).toFixed(1);
      const z = s.length > 3 ? s.substring(0, s.length - 2) : s;
      return `${color}${z.padStart(3)}%`;
    });
    const seed = (() => {
      const ratio = (a.counts[0] ?? 0) / count;
      const [p, ls, color] =
        ratio < 0.5
          ? (["+", "lastSeen", "17"] as const)
          : (["-", "lastNotSeen", "52"] as const);
      const v = a[ls];
      if (v < 0) {
        return "         ";
      }
      return `\x1b[38;5;${color}m${p}${v.toString(16).toUpperCase().padStart(8, "0")}`;
    })();
    return { color: rowColor, name, saturation, seed };
  });

  function drawRow(row: Row | undefined) {
    if (!row) {
      return "";
    }
    const r = filterTruthy([row.name, ...row.saturation, row.seed]);
    return `${row.color}${r.join(" ")}\x1b[m`;
  }

  const result = [
    `${drawRow(header1)} | ${drawRow(header1)}`,
    `${drawRow(header2)} | ${drawRow(header2)}`,
  ];
  const mid = Math.ceil(rows.length / 2);
  for (let i = 0; i < mid; i++) {
    result.push(`${drawRow(rows[i])} | ${drawRow(rows[i + mid])}`);
  }
  result.push(`\nMaps tested: ${count}/${totalCount}`);
  // eslint-disable-next-line no-console
  console.log(`\x1bc${result.join("\n")}`);
}

function main({
  firstSeed,
  totalCount,
}: {
  firstSeed: number;
  totalCount: number;
}) {
  const stats: Stats = {};
  ARCHITECTS.forEach((architect) => {
    stats[architect.name] = {
      counts: [],
      lastSeen: -1,
      lastNotSeen: -1,
    };
  });

  for (let i = 0; i < totalCount; i++) {
    const seed = (firstSeed + i) % MAX_PLUS_ONE;
    const concordanceInSeed = gen(seed);
    ARCHITECTS.forEach((architect) => {
      const a = stats[architect.name];
      const timesArchitectInSeed = concordanceInSeed[architect.name] ?? 0;
      for (let j = 0; j < timesArchitectInSeed; j++) {
        a.counts[j] = (a.counts[j] ?? 0) + 1;
      }
      if (timesArchitectInSeed > 0) {
        a.lastSeen = seed;
      } else {
        a.lastNotSeen = seed;
      }
    });
    if (i % 19 === 0) {
      draw(stats, i + 1, totalCount);
    }
  }
  draw(stats, totalCount, totalCount);
}

const args = getFlags({
  args: process.argv.slice(2),
  usage: `USAGE: yarn architect-stats [FLAGS]
Builds many maps up to the Establish step and logs stats on architects used.`,
  options: {
    firstSeed: {
      type: "string",
      short: "s",
      default: "EFE63E54",
      help: "The first seed to check.",
      parse: (it) => parseInt(it, 16),
    },
    totalCount: {
      type: "string",
      short: "c",
      default: "10000",
      help: "The number of seeds to check.",
      parse: (it) => parseInt(it, 10),
    },
  },
});

main(args);
