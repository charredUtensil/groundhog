import { expect, it } from "vitest";

it("should have VITE_APP_VERSION defined", () => {
  expect(import.meta.env.VITE_APP_VERSION).toBe("0.0.0-TEST");
});
