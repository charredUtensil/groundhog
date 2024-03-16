import { MutableGrid } from "./grid";

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
