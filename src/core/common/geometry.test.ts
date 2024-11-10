import { closestTo, plotLine } from "./geometry";

describe("closestTo", () => {
  it("should return null for an empty list of points", () => {
    const result = closestTo([0, 0], []);
    expect(result).toBeNull();
  });

  it("should return the only point in the list", () => {
    const result = closestTo([0, 0], [[1, 1]]);
    expect(result).toEqual([1, 1]);
  });

  it("should return the closest point", () => {
    const result = closestTo(
      [7, -2],
      [
        [1, 1],
        [6, -1],
        [14, -2],
        [-7, 2],
      ],
    );
    expect(result).toEqual([6, -1]);
  });
});

describe("plotLine", () => {
  it("draws a horizontal line", () => {
    const line = Array.from(plotLine([4, 7], [8, 7]));
    expect(line).toEqual([
      [4, 7],
      [5, 7],
      [6, 7],
      [7, 7],
      [8, 7],
    ]);
  });
  it("draws a vertical line", () => {
    const line = Array.from(plotLine([-1, 2], [-1, 5]));
    expect(line).toEqual([
      [-1, 2],
      [-1, 3],
      [-1, 4],
      [-1, 5],
    ]);
  });
  it("draws a diagonal line", () => {
    const line = Array.from(plotLine([-1, 2], [3, 0]));
    expect(line).toEqual([
      [-1, 2],
      [0, 2],
      [0, 1],
      [1, 1],
      [2, 1],
      [2, 0],
      [3, 0],
    ]);
  });
});
