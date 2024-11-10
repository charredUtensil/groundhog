import { sanitizeString } from "./script";

describe("escapeString", () => {
  it("handles the empty string", () => {
    expect(sanitizeString("")).toBe("");
  });
  it("handles a normal string", () => {
    expect(sanitizeString("A landslide has occurred!")).toBe(
      "A landslide has occurred!",
    );
  });
  it("removes quotes", () => {
    expect(sanitizeString('An "Energy Crystal" has been found!')).toBe(
      "An Energy Crystal has been found!",
    );
  });
  it("removes backslashes", () => {
    expect(sanitizeString("\\n\\n\\n\\")).toBe("nnn");
  });
  it("removes newlines", () => {
    expect(sanitizeString("one\ntwo\n  three  \n  \n  \n  four")).toBe(
      "one two three four",
    );
  });
});
