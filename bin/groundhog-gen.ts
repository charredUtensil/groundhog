#!/usr/bin/env node
import { DiceBox, inferContextDefaults } from "../src/core/common";
import { CAVERN_TF } from "../src/core/transformers";

function generate() {
  const seed = 0xEFE63E54;
  let state = CAVERN_TF.first({
    context: inferContextDefaults({seed}),
    dice: new DiceBox(seed),
  });
  
  while (state.next) {
    console.log(`${state.progress} ${state.name}`);
    state = state.next();
  }
}

generate();