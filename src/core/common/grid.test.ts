import { MutableGrid, _forTests } from "./grid";

const { toKey, parseKey } = _forTests;

describe("toKey", () => {
  it("maths correctly", () => {
    expect((0x4000 << 16) | 0x4000).toBe(0x40004000);
  });
  it("handles origin", () => {
    expect(toKey(0, 0)).toBe(0x40004000);
  });
  it("handles positive coordinates", () => {
    expect(toKey(7, 3)).toBe(0x40034007);
  });
  it("handles negative coordinates", () => {
    expect(toKey(-1, -4)).toBe(0x3ffc3fff);
  });
  it("handles positive max", () => {
    expect(toKey(0x3fff, 0x3fff)).toBe(0x7fff7fff);
  });
  it("handles negative max", () => {
    expect(toKey(-1 * 0x4000, -1 * 0x4000)).toBe(0);
  });
  it("handles negative coordinates", () => {
    expect(toKey(-1, -4)).toBe(0x3ffc3fff);
  });
  it("rejects positive x out of bounds", () => {
    expect(() => {
      toKey(0x4000, 0);
    }).toThrow();
  });
  it("rejects postitive y out of bounds", () => {
    expect(() => {
      toKey(0, 0x4000);
    }).toThrow();
  });
  it("rejects negative x out of bounds", () => {
    expect(() => {
      toKey(-1 * 0x4001, 0);
    }).toThrow();
  });
  it("rejects negative y out of bounds", () => {
    expect(() => {
      toKey(0, -1 * 0x4001);
    }).toThrow();
  });
});

describe("parseKey", () => {
  it("parses to origin", () => {
    expect(parseKey(0x40004000)).toEqual([0, 0]);
  });
  it("handles positive coordinates", () => {
    expect(parseKey(0x40034007)).toEqual([7, 3]);
  });
  it("handles negative coordinates", () => {
    expect(parseKey(0x3ffc3fff)).toEqual([-1, -4]);
  });
});

describe("grid", () => {
  it("saves positive values", () => {
    const grid = new MutableGrid<number>();
    grid.set(1, 2, 1122);
    grid.set(4, 0, 4400);
    expect(grid.get(1, 2)).toBe(1122);
    expect(grid.get(4, 0)).toBe(4400);
  });
  it("saves negative values", () => {
    const grid = new MutableGrid<number>();
    grid.set(-9, -3, 9933);
    grid.set(-6, 7, 6677);
    grid.set(1, -4, 1144);
    expect(grid.get(-9, -3)).toBe(9933);
    expect(grid.get(-6, 7)).toBe(6677);
    expect(grid.get(1, -4)).toBe(1144);
  });
  it("overwrites values", () => {
    const grid = new MutableGrid<number>();
    grid.set(1, 2, 1122);
    grid.set(1, 2, 413);
    expect(grid.get(1, 2)).toBe(413);
  });
  describe("copy", () => {
    it("copies values", () => {
      const grid = new MutableGrid<number>();
      grid.set(1, 1, 42);
      grid.set(1, 2, 14);
      const copy = grid.copy();
      expect(grid.get(1, 1)).toBe(42);
      expect(grid.get(1, 2)).toBe(14);
      expect(copy.get(1, 1)).toBe(42);
      expect(copy.get(1, 2)).toBe(14);
    });

    it("creates an independent copy", () => {
      const grid = new MutableGrid<number>();
      grid.set(1, 1, 42);
      const copy = grid.copy();
      grid.set(3, 3, 77);
      copy.set(1, 1, 11);
      copy.set(1, 2, 14);
      expect(grid.get(1, 1)).toBe(42);
      expect(grid.get(1, 2)).toBe(undefined);
      expect(grid.get(3, 3)).toBe(77);
      expect(copy.get(1, 1)).toBe(11);
      expect(copy.get(1, 2)).toBe(14);
      expect(copy.get(3, 3)).toBe(undefined);
    });
  });
  describe("map", () => {
    it("iterates members", () => {
      const grid = new MutableGrid<number>();
      grid.set(1, 2, 1122);
      grid.set(9, 3, 9933);
      const mapped = grid.map((v, x, y) => [x, y, v]);
      expect(mapped).toEqual([
        [1, 2, 1122],
        [9, 3, 9933],
      ]);
    });
  });
});
