import { plotLine } from "./geometry";

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
