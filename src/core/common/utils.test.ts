import { pairMap } from "./utils";

describe("pairMap", () => {
  it("is empty when input is empty", () => {
    const input: number[] = [];
    const output = pairMap(input, (a, b, i) => [a, b, i]);
    expect(output).toEqual([]);
  });
  it("is empty when input is one", () => {
    const input = [17];
    const output = pairMap(input, (a, b, i) => [a, b, i]);
    expect(output).toEqual([]);
  });
  it("iterates over one pair", () => {
    const input = [93, -25];
    const output = pairMap(input, (a, b, i) => [a, b, i]);
    expect(output).toEqual([[93, -25, 0]]);
  });
  it("iterates over many pairs", () => {
    const input = [17, 33, 9, 9, 21];
    const output = pairMap(input, (a, b, i) => [a, b, i]);
    expect(output).toEqual([
      [17, 33, 0],
      [33, 9, 1],
      [9, 9, 2],
      [9, 21, 3],
    ]);
  });
});
