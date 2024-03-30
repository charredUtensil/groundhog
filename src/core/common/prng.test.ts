import { PseudorandomStream } from "./prng";

describe("PseudorandomStream", () => {
  let stream: PseudorandomStream;

  beforeEach(() => {
    stream = new PseudorandomStream(1234); // Fixed seed for consistent test results
  });

  describe("chance", () => {
    test("should return true with the specified probability", () => {
      const trials = 1000;
      let successes = 0;
      for (let i = 0; i < trials; i++) {
        if (stream.chance(0.7)) {
          successes++;
        }
      }
      expect(successes / trials).toBeCloseTo(0.7, 0.1); // Allow for slight deviation
    });
  });

  describe("uniform", () => {
    test("should generate a number within the specified range", () => {
      const trials = 1000;
      for (let i = 0; i < trials; i++) {
        const value = stream.uniform({ min: 2, max: 5 });
        expect(value).toBeGreaterThanOrEqual(2);
        expect(value).toBeLessThan(5);
      }
    });
  });

  describe("beta", () => {
    test("should generate a beta-distributed number", () => {
      // Beta distribution is continuous, so exact value assertion is difficult
      // This test verifies it falls within a reasonable range based on parameters.
      const trials = 1000;
      for (let i = 0; i < trials; i++) {
        const value = stream.beta({ a: 2, b: 3, min: 0, max: 1 });
        expect(value).toBeGreaterThanOrEqual(0);
        expect(value).toBeLessThan(1);
      }
    });
  });

  describe("uniformInt", () => {
    test("should generate a random integer within the specified range", () => {
      const trials = 1000;
      for (let i = 0; i < trials; i++) {
        const value = stream.uniformInt({ min: 1, max: 6 });
        expect(Number.isInteger(value)).toBeTruthy();
        expect(value).toBeGreaterThanOrEqual(1);
        expect(value).toBeLessThan(6);
      }
    });
  });

  describe("betaInt", () => {
    test("should generate a random integer based on the beta distribution", () => {
      const trials = 1000;
      for (let i = 0; i < trials; i++) {
        const value = stream.betaInt({ a: 3, b: 2, min: 0, max: 3 });
        expect(Number.isInteger(value)).toBeTruthy();
        expect(value).toBeGreaterThanOrEqual(0);
        expect(value).toBeLessThan(3);
      }
    });
  });

  describe("uniformChoice", () => {
    test("should select a random element from the array", () => {
      const choices = ["a", "b", "c"];
      const selected = new Set();
      const trials = 1000;
      for (let i = 0; i < trials; i++) {
        selected.add(stream.uniformChoice(choices));
      }
      expect(selected.size).toBe(choices.length); // All elements should be chosen eventually
    });
  });

  // Add similar tests for betaChoice and weightedChoice

  describe("shuffle", () => {
    test("should shuffle the elements of the array", () => {
      const original = [1, 2, 3, 4, 5];
      const shuffled = stream.shuffle(original);
      expect(shuffled).not.toEqual(original); // Order should change
      //expect(shuffled).toContain(...original); // Original elements must be preserved
    });
  });
});
