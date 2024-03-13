import { Baseplate } from "./baseplate";

describe("baseplate", () => {
  describe("pearlRadius", () => {
    test("for odd square", () => {
      expect(new Baseplate(100, 0, 0, 8, 8, "cave").pearlRadius).toBe(4);
    });
    test("for even square", () => {
      expect(new Baseplate(200, 0, 0, 9, 9, "cave").pearlRadius).toBe(4);
    });
    test("for oblong", () => {
      expect(new Baseplate(300, 0, 0, 16, 5, "cave").pearlRadius).toBe(2);
    });
  });
});
