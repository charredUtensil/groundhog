import { PseudorandomStream } from "../../common";
import { Baseplate } from "../../models/baseplate";
import { Path } from "../../models/path";
import { EstablishedPlan } from "./05_establish";
import { LayerGrid, caveNucleus, hallNucleus, trail } from "./06_pearl";

describe("LayerGrid", () => {
  it("stores layers", () => {
    const grid = new LayerGrid();
    grid.set(2, 6, 0);
    grid.set(7, 1, 2);
    expect(grid.get(2, 6)).toBe(0);
    expect(grid.get(7, 1)).toBe(2);
  });
  it("overwrites higher layers", () => {
    const grid = new LayerGrid();
    grid.set(2, 6, 2);
    grid.set(2, 6, 1);
    expect(grid.get(2, 6)).toBe(1);
  });
  it("does not overwrite lower layers", () => {
    const grid = new LayerGrid();
    grid.set(2, 6, 0);
    grid.set(2, 6, 2);
    expect(grid.get(2, 6)).toBe(0);
  });
});

describe("hallNucleus", () => {
  it("is a straight line between two baseplates", () => {
    const a = new Baseplate(14, 0, 0, 3, 3, "cave");
    const b = new Baseplate(15, 3, 0, 6, 3, "cave");
    const path = new Path(21, "spanning", [a, b]);
    const plan = { path } as EstablishedPlan<any>;
    const grid = new LayerGrid();
    hallNucleus(grid, plan);
    expect(grid.atLayer(0)).toEqual([
      [1, 1],
      [2, 1],
      [3, 1],
      [4, 1],
    ]);
  });
});

describe("caveNucleus", () => {
  it("for one square cave with odd size is a single tile", () => {
    const bp = new Baseplate(22, 0, 0, 19, 19, "cave");
    const path = new Path(25, "spanning", [bp]);
    const plan = { path, pearlRadius: bp.pearlRadius } as EstablishedPlan<any>;
    const grid = new LayerGrid();
    caveNucleus(grid, plan);
    expect(grid.atLayer(0)).toEqual([[9, 9]]);
  });
  it("for one square cave with even size is four tiles", () => {
    const bp = new Baseplate(22, 0, 0, 20, 20, "cave");
    const path = new Path(25, "spanning", [bp]);
    const plan = { path, pearlRadius: bp.pearlRadius } as EstablishedPlan<any>;
    const grid = new LayerGrid();
    caveNucleus(grid, plan);
    expect(grid.atLayer(0)).toEqual([
      [9, 9],
      [9, 10],
      [10, 9],
      [10, 10],
    ]);
  });
});

describe("trail", () => {
  describe("with no baroqueness", () => {
    it("wraps a single tile", () => {
      const grid = new LayerGrid();
      grid.set(14, 26, 0);
      const r = trail(grid, {} as PseudorandomStream, 0, 1, {
        x: 14,
        y: 25,
        vx: 1,
        vy: 0,
      });
      const expected = [
        [14, 25],
        [15, 26],
        [15, 27],
        [14, 27],
        [13, 26],
        [13, 25],
      ];
      expect(r).toEqual(expected);
      expect(grid.atLayer(1)).toEqual(expected);
    });
    it("wraps a 2x2 square", () => {
      const grid = new LayerGrid();
      grid.set(8, 4, 0);
      grid.set(9, 4, 0);
      grid.set(8, 5, 0);
      grid.set(9, 5, 0);
      const r = trail(grid, {} as PseudorandomStream, 0, 1, {
        x: 8,
        y: 3,
        vx: 1,
        vy: 0,
      });
      const expected = [
        [8, 3],
        [9, 3],
        [10, 4],
        [10, 5],
        [9, 6],
        [8, 6],
        [7, 5],
        [7, 4],
      ];
      expect(r).toEqual(expected);
      expect(grid.atLayer(1)).toEqual(expected);
    });
  });
});
