import phraseGraph, { _forTests, PhraseGraph } from "./builder";
import { Phrase } from "./base";
import { PseudorandomStream } from "../../common/prng";

const { merge, stateToMask, maskToStates } = _forTests;

describe("merge", () => {
  it("returns empty array for empty arrays", () => {
    expect(merge([], [])).toEqual([]);
  });

  it("combines single element arrays", () => {
    const phraseA = [{ id: 1 }] as Phrase<{}, unknown>[];
    const phraseB = [{ id: 2 }] as Phrase<{}, unknown>[];
    expect(merge(phraseA, phraseB)).toEqual([{ id: 1 }, { id: 2 }]);
  });

  it("sorts arrays numerically", () => {
    const phraseA = [{ id: 1 }, { id: 7 }, { id: 23 }] as Phrase<{}, unknown>[];
    const phraseB = [{ id: 2 }, { id: 51 }] as Phrase<{}, unknown>[];
    expect(merge(phraseA, phraseB)).toEqual([
      { id: 1 },
      { id: 2 },
      { id: 7 },
      { id: 23 },
      { id: 51 },
    ]);
  });

  it("merges arrays with different elements in order", () => {
    const phraseA = [{ id: 1 }, { id: 3 }] as Phrase<{}, unknown>[];
    const phraseB = [{ id: 2 }, { id: 4 }] as Phrase<{}, unknown>[];
    expect(merge(phraseA, phraseB)).toEqual([
      { id: 1 },
      { id: 2 },
      { id: 3 },
      { id: 4 },
    ]);
  });

  it("merges arrays with duplicate elements", () => {
    const phraseA = [{ id: 1 }, { id: 2 }] as Phrase<{}, unknown>[];
    const phraseB = [{ id: 2 }, { id: 3 }] as Phrase<{}, unknown>[];
    expect(merge(phraseA, phraseB)).toEqual([{ id: 1 }, { id: 2 }, { id: 3 }]);
  });

  it("merges with one array empty", () => {
    const phraseA = [{ id: 1 }] as Phrase<{}, unknown>[];
    const phraseB = [] as Phrase<{}, unknown>[];
    expect(merge(phraseA, phraseB)).toEqual([{ id: 1 }]);
  });
});

describe("stateToMask", () => {
  const states = ["a", "b", "c"] as const;

  it("should return 1 for 'start'", () => {
    expect(stateToMask("start", states)).toBe(1n);
  });

  it("should return 2 for 'end'", () => {
    expect(stateToMask("end", states)).toBe(2n);
  });

  it("should return the correct mask for states", () => {
    expect(stateToMask("a", states)).toBe(4n);
    expect(stateToMask("b", states)).toBe(8n);
    expect(stateToMask("c", states)).toBe(16n);
  });
});

describe("maskToStates", () => {
  const states = ["x", "y", "z"] as const;

  it("should return an empty string for 0", () => {
    expect(maskToStates(0n, states)).toBe("");
  });

  it("should return 'start' for 1", () => {
    expect(maskToStates(1n, states)).toBe("start");
  });

  it("should return 'end' for 2", () => {
    expect(maskToStates(2n, states)).toBe("end");
  });

  it("should return a single state", () => {
    //                    zyxes
    expect(maskToStates(0b00100n, states)).toBe("x");
    expect(maskToStates(0b01000n, states)).toBe("y");
    expect(maskToStates(0b10000n, states)).toBe("z");
  });

  it("should return 'start end' for mask 3", () => {
    expect(maskToStates(3n, states)).toBe("start end");
  });

  it("should return 'end x z' for its mask", () => {
    //                    zyxes
    expect(maskToStates(0b10110n, states)).toBe("end x z");
  });
});

describe("integrated", () => {
  let g: PhraseGraph<{ a: boolean; b: boolean; c: boolean }, {}>;
  let rng: PseudorandomStream;
  beforeEach(() => {
    g = phraseGraph("Integrated", ({ pg, state, start, end, cut, skip }) => {
      start
        .then("START")
        .then(state("a").then("A"), skip)
        .then(state("b").then("B"), skip)
        .then(state("c").then("C1"), skip)
        .then(state("c").then("C2"), skip)
        .then(state("c").then("C3"), skip)
        .then(state("c").then("C4"), skip)
        .then(state("c").then("C5"), skip)
        .then(state("c").then("C6"), skip)
        .then(state("c").then("C7"), skip)
        .then(state("c").then("C8"), skip)
        .then(state("c").then("C9"), skip)
        .then("END")
        .then(end);
    });
    rng = new PseudorandomStream(0x86472025);
  });

  it("includes no states", () => {
    expect(g.generate(rng, { a: false, b: false, c: false }, {})).toBe(
      "START END",
    );
  });

  it("includes one state", () => {
    expect(g.generate(rng, { a: true, b: false, c: false }, {})).toBe(
      "START A END",
    );
  });

  it("includes two states", () => {
    expect(g.generate(rng, { a: true, b: true, c: false }, {})).toBe(
      "START A B END",
    );
  });

  it("includes a state exactly once", () => {
    expect(g.generate(rng, { a: false, b: false, c: true }, {})).toMatch(
      /^START C\d END$/,
    );
  });
});
