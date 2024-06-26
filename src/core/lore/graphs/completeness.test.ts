import phraseGraph, { PhraseGraph } from "../builder";
import { State } from "../lore";
import { FAILURE, SUCCESS } from "./conclusions";
import {
  FOUND_ALL_LOST_MINERS,
  FOUND_HOARD,
  FOUND_HQ,
  FOUND_LOST_MINERS,
} from "./events";
import ORDERS from "./orders";
import PREMISE from "./premise";

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
    .then(end);
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
