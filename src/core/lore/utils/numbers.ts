const ONES = [
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
  "ten",
  "eleven",
  "twelve",
  "thirteen",
  "fourteen",
  "fifteen",
  "sixteen",
  "seventeen",
  "eighteen",
  "nineteen",
] as const;
const TENS = [
  "twenty",
  "thirty",
  "forty",
  "fifty",
  "sixty",
  "seventy",
  "eighty",
  "ninety",
] as const;

/**
 * For numbers between 0-999 inclusive, returns the English representation of
 * the given number. Otherwise, returns the number as a string.
 * 0 => "zero"
 * 2 => "two"
 * 35 => "thirty five"
 * 469 => "four hundred sixty nine"
 * 1087 => "1087"
 */
export function spellNumber(n: number): string {
  if (n > 999 || n < 0) {
    return n.toString();
  }
  if (n === 0) {
    return "zero";
  }
  const result: string[] = [];
  if (n >= 100) {
    result.push(`${spellNumber(Math.floor(n / 100))} hundred`);
    n %= 100;
  }
  if (n >= 20) {
    result.push(TENS[Math.floor(n / 10) - 2]);
    n %= 10;
  }
  if (n > 0) {
    result.push(ONES[n - 1]);
    n = 0;
  }
  return result.join(" ");
}

export function bothOrSpell(n: number, fn: (s: string) => string) {
  return n === 2 ? "both" : fn(spellNumber(n));
}
