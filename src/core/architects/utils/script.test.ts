import { escapeString } from "./script";

describe('escapeString', () => {
  it('handles the empty string', () => {
    expect(escapeString('')).toBe('');
  });
  it('handles a normal string', () => {
    expect(escapeString('A landslide has occurred!')).toBe('A landslide has occurred!');
  });
  it('escapes quotes', () => {
    expect(escapeString('An "Energy Crystal" has been found!')).toBe('An \\"Energy Crystal\\" has been found!');
  });
  it('removes backslashes', () => {
    expect(escapeString('\\n\\n\\n\\')).toBe('nnn');
  });
});