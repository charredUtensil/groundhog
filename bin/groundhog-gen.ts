#!/usr/bin/env node
import "dotenv/config";
import { inferContextDefaults } from "../src/core/common";
import { CAVERN_TF } from "../src/core/transformers";
import { SerializedCavern } from "../src/core/transformers/04_ephemera/05_serialize";

function main() {
  const seed = parseInt(process.env.SEED ?? "0", 16);
  if (!seed) {
    throw new Error("Usage:\n  SEED=... yarn gen");
  }
  let state = CAVERN_TF.first({
    initialContext: inferContextDefaults({ seed }),
  });

  while (state.next) {
    state = state.next();
  }

  console.log((state.result as SerializedCavern).serialized);
}

main();
