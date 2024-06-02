import { Phrase, _forTests } from "./builder";

const { merge } = _forTests;

describe("merge", () => {
  it("returns empty array for empty arrays", () => {
    expect(merge([], [])).toEqual([]);
  });

  it("combines single element arrays", () => {
    const phraseA = [{ id: 1 }] as Phrase<{}>[];
    const phraseB = [{ id: 2 }] as Phrase<{}>[];
    expect(merge(phraseA, phraseB)).toEqual([{ id: 1 }, { id: 2 }]);
  });

  it("sorts arrays numerically", () => {
    const phraseA = [{ id: 1 }, { id: 7 }, { id: 23 }] as Phrase<{}>[];
    const phraseB = [{ id: 2 }, { id: 51 }] as Phrase<{}>[];
    expect(merge(phraseA, phraseB)).toEqual([
      { id: 1 },
      { id: 2 },
      { id: 7 },
      { id: 23 },
      { id: 51 },
    ]);
  });

  it("merges arrays with different elements in order", () => {
    const phraseA = [{ id: 1 }, { id: 3 }] as Phrase<{}>[];
    const phraseB = [{ id: 2 }, { id: 4 }] as Phrase<{}>[];
    expect(merge(phraseA, phraseB)).toEqual([
      { id: 1 },
      { id: 2 },
      { id: 3 },
      { id: 4 },
    ]);
  });

  it("merges arrays with duplicate elements", () => {
    const phraseA = [{ id: 1 }, { id: 2 }] as Phrase<{}>[];
    const phraseB = [{ id: 2 }, { id: 3 }] as Phrase<{}>[];
    expect(merge(phraseA, phraseB)).toEqual([{ id: 1 }, { id: 2 }, { id: 3 }]);
  });

  it("merges with one array empty", () => {
    const phraseA = [{ id: 1 }] as Phrase<{}>[];
    const phraseB = [] as Phrase<{}>[];
    expect(merge(phraseA, phraseB)).toEqual([{ id: 1 }]);
  });
});
