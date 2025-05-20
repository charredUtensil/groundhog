import { State } from "../lore";
import phraseGraph from "../utils/builder";
import { expectCompletion } from "./completeness";

describe("expectCompletion", () => {

  it("fails an empty graph", () => {
    const g = phraseGraph<any, any>(
      "Empty",
      ({ pg, state, start, end, cut, skip }) => {
      }
    );
    expect(g.phrases[0].reachableStates).toEqual(new Set<bigint>([1n]));
    expect(() => {
      expectCompletion(g)
    }).toThrow("Missing 1 states, including \"start end\"");
  });

  it("passes a simple graph", () => {
    const g = phraseGraph<any, any>(
      "Simple",
      ({ pg, state, start, end, cut, skip }) => {
        start.then("simple").then(end);
      }
    );
    expect(g.phrases[0].reachableStates).toEqual(new Set<bigint>([0b11n]));
    expectCompletion(g);
  })

  it("fails a graph that doesn't end", () => {
    const g = phraseGraph<any, any>(
      "Unfinished",
      ({ pg, state, start, end, cut, skip }) => {
        start.then("one").then("two").then("three");
      }
    );
    expect(g.phrases[0].reachableStates).toEqual(new Set<bigint>([1n]));
    expect(() => {
      expectCompletion(g)
    }).toThrow("Missing 1 states, including \"start end\"");
  });

  it("fails a graph that must contain monsters", () => {
    const g = phraseGraph<State, any>(
      "Must Monsters",
      ({ pg, state, start, end, cut, skip }) => {
        start
          .then(state("hasMonsters"))
          .then(end);
      }
    );
    expect(g.phrases[0].reachableStates).toEqual(new Set<bigint>([0b111n]));
    expect(() => {
      expectCompletion(g)
    }).toThrow("Missing 1 states, including \"start end\"");
  });

  it("passes a graph that may contain monsters", () => {
    const g = phraseGraph<State, any>(
      "May Monsters",
      ({ pg, state, start, end, cut, skip }) => {
        start
          .then(state("hasMonsters"), skip)
          .then(end);
      }
    );
    expect(g.phrases[0].reachableStates).toEqual(new Set<bigint>([0b011n, 0b111n]));
    expectCompletion(g);
  });

  it("fails a graph with inflexible objectives", () => {
    const g = phraseGraph<State, any>(
      "Objectiveless",
      ({ pg, state, start, end, cut, skip }) => {
        start
          .then(state("resourceObjective"))
          .then(state("lostMinersOne", "lostMinersTogether", "lostMinersApart"))
          .then(state("buildAndPowerGcOne", "buildAndPowerGcMultiple"))
          .then(state("buildAndPowerSsOne", "buildAndPowerSsMultiple"))
          .then("one")
          .then("two")
          .then("three")
          .then(end);
      }
    );
    expect(() => {
      expectCompletion(g)
    }).toThrow(/Missing \d+ states/);
  });
})