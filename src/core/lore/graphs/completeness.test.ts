import phraseGraph, { PhraseGraph } from "../builder";
import { State } from "../lore";
import { FAILURE, SUCCESS } from "./conclusions";
import {
  FOUND_ALL_LOST_MINERS,
  FOUND_HOARD,
  FOUND_HQ,
  FOUND_LOST_MINERS,
  FOUND_SLUG_NEST,
} from "./events";
import { NAME } from "./names";
import ORDERS from "./orders";
import PREMISE from "./premise";
import { SEISMIC_FORESHADOW } from "./seismic";

function expectCompletion(
  actual: PhraseGraph<any>,
  expected: PhraseGraph<any>,
) {
  const keep: { [key: string]: true } = { start: true, end: true };
  actual.states.forEach((s) => (keep[s] = true));
  const es: { [key: string]: true } = {};
  Object.keys(expected.phrases[0].reachableStates).forEach((reachable) => {
    es[
      reachable
        .split(",")
        .filter((s) => keep[s])
        .join(",")
    ] = true;
  });

  const as: { [key: string]: true } = {};
  Object.keys(actual.phrases[0].reachableStates).forEach((reachable) => {
    if (es[reachable]) {
      as[reachable] = true;
    }
  });

  expect(as).toEqual(es);
}

const EXPECTED = phraseGraph<State>(({ pg, state, start, end, cut, skip }) => {
  const hasHq = pg(pg(), state("hqIsRuin"));

  start
    .then(skip, state("floodedWithLava", "floodedWithWater"))
    .then(skip, state("hasMonsters"))
    .then(skip, state("hasSlugs"))
    .then(skip, state("spawnHasErosion"))
    .then(skip, state("treasureCaveOne", "treasureCaveMany"))
    .then(
      skip,
      state("spawnIsNomadOne", "spawnIsNomadsTogether"),
      state("spawnIsHq").then(hasHq).then(cut),
    )
    .then(skip, state("findHq").then(hasHq).then(cut))
    .then(skip, cut.then(hasHq))
    .then(
      state("resourceObjective"),
      state("lostMinersOne", "lostMinersTogether", "lostMinersApart").then(
        skip,
        state("resourceObjective"),
      ),
    )
    .then(state("rockBiome", "iceBiome", "lavaBiome"))
    .then(end);
});

test(`Name is complete`, () => {
  expectCompletion(NAME, EXPECTED);
});

test(`Premise is complete`, () => {
  expectCompletion(PREMISE, EXPECTED);
});

test(`Orders is complete`, () => {
  expectCompletion(ORDERS, EXPECTED);
});

test(`Success is complete`, () => {
  expectCompletion(SUCCESS, EXPECTED);
});

test(`Failure is complete`, () => {
  expectCompletion(FAILURE, EXPECTED);
});

test(`Found all lost miners is complete`, () => {
  expectCompletion(FOUND_ALL_LOST_MINERS, EXPECTED);
});

test(`Found hoard is complete`, () => {
  expectCompletion(FOUND_HOARD, EXPECTED);
});

// test(`Found lost miners is complete`, () => {
//   expectCompletion(FOUND_LOST_MINERS, EXPECTED);
// })

test(`Found HQ is complete`, () => {
  expectCompletion(FOUND_HQ, EXPECTED);
});

test(`Found Slug Nest is complete`, () => {
  expectCompletion(FOUND_SLUG_NEST, EXPECTED);
});

test(`Seismic Foreshadow is complete`, () => {
  expectCompletion(SEISMIC_FORESHADOW, EXPECTED);
});
