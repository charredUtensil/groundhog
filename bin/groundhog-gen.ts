#!/usr/bin/env node
import { inferContextDefaults } from "../src/core/common";
import { CAVERN_TF } from "../src/core/transformers";

function generate() {
  const seed = 0xEFE63E54;
  let state = CAVERN_TF.first({
    initialContext: inferContextDefaults({seed}),
  });
  
  while (state.next) {
    console.log(`${(state.progress * 100).toFixed()}% ${state.name}`);
    state = state.next();
  }
}

generate();