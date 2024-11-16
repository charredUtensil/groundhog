#!/usr/bin/env node
import "dotenv/config";
import { PseudorandomStream } from "../src/core/common/prng";
import ALL_GRAPHS from "../src/core/lore/graphs";


async function main() {
  const graphChosen = parseInt(process.env.GRAPH ?? "-1", 10);
  if (graphChosen < 0) {
    console.log(ALL_GRAPHS.map((pg, i) => `${i} ${pg.name}`).join("\n"));
    return;
  }

  const pg = ALL_GRAPHS[graphChosen];
  const state: any = {};
  let hasAny = false;
  pg.states.forEach(st => {
    const has = process.env[st] === "1"
    hasAny ||= has;
    state[st] = has;
  })
  console.log(pg.name);
  if (!hasAny) {
    console.log("Relevant States: %o", pg.states);
    return;
  }
  const seed = parseInt(process.env.SEED ?? "1998", 16);
  const rng = new PseudorandomStream(seed);
  for (let i = 0; i < 10; i++) {
    const text = pg.generate(rng, state, {}).text;
    console.log(`${`${i}`.padStart(2)}  ${Array.from(text.match(/.{0,96}/g)!).join("\n    ")}`);
  }
}

main();
