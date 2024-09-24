import { BUILD_AND_POWER } from "../../architects/build_and_power";
import phraseGraph, { PhraseGraph } from "../builder";
import { FoundLostMinersState, State } from "../lore";
import { BUILD_POWER_GC_FIRST, BUILD_POWER_GC_LAST, BUILD_POWER_GC_PENULTIMATE } from "./build_and_power";
import { FAILURE, SUCCESS } from "./conclusions";
import {
  FAILURE_BASE_DESTROYED,
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

type CombinedState = State & FoundLostMinersState & { readonly commend: true }

function expectCompletion(actual: PhraseGraph<any>) {
  const keep: { [key: string]: true } = { start: true, end: true };
  actual.states.forEach((s) => (keep[s] = true));
  const expected = phraseGraph<CombinedState>("Expected", ({ pg, state, start, end, cut, skip }) => {
    // Only define states if they exist in actual
    function st(...args: Parameters<typeof state>) {
      const presentArgs = args.filter(arg => keep[arg]);
      if (!presentArgs.length) {
        return skip;
      } else if (presentArgs.length < args.length) {
        return pg(skip, state(...presentArgs));
      }
      return state(...presentArgs);
    }
    
    const hasAnyObjective = pg();
    start
      .then(skip, st("floodedWithLava", "floodedWithWater"))
      .then(skip, st("hasMonsters"))
      .then(skip, st("hasSlugs"))
      .then(skip, st("spawnHasErosion"))
      .then(skip, st("treasureCaveOne", "treasureCaveMany"))
      .then(
        pg(skip, st("spawnIsNomadOne", "spawnIsNomadsTogether")).then(
          skip,
          st("findHq").then(skip, st("hqIsRuin")),
        ),
        st("spawnIsHq").then(
          skip,
          st("hqIsFixedComplete"),
          st("hqIsRuin"),
        ),
      )
      .then(skip, st("lostMinersOne", "lostMinersTogether", "lostMinersApart").then(skip, hasAnyObjective.then(cut)))
      .then(skip, st("buildAndPowerGcOne", "buildAndPowerGcMultiple").then(skip, hasAnyObjective.then(cut)))
      .then(st("resourceObjective")).then(hasAnyObjective)
      .then(st("rockBiome", "iceBiome", "lavaBiome"))
      .then(skip, st("hasGiantCave"))
      .then(st("foundMinersOne", "foundMinersTogether"))
      .then(st("commend"))
      .then(end);
  });
  expect(actual.states).toEqual(expected.states);

  // Actual can sometimes contain states that are impossible, so it's ok if
  // there are reachable states in actual not in expected.
  expect(actual.phrases[0].reachableStates).toEqual(
    expect.objectContaining(expected.phrases[0].reachableStates));
}

const GRAPHS_TO_TEST = [
  BUILD_POWER_GC_FIRST,
  BUILD_POWER_GC_PENULTIMATE,
  BUILD_POWER_GC_LAST,
  SUCCESS,
  FAILURE,
  FOUND_LOST_MINERS,
  FOUND_ALL_LOST_MINERS,
  FOUND_HOARD,
  FOUND_HQ,
  FOUND_SLUG_NEST,
  FAILURE_BASE_DESTROYED,
  NAME,
  ORDERS,
  PREMISE,
  SEISMIC_FORESHADOW,
] as const;

describe(`Graph is complete`, () => {
  GRAPHS_TO_TEST.forEach((pg) => {
    test(`for ${pg.name}`, () => {
      expectCompletion(pg);
    })
  })
})