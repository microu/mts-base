import { reduce } from "../../src/collections";

describe("reduce function", () => {
  test("reduce empty", () => {
    expect(reduce((r, v) => r + v, [], 99)).toBe(99);
    expect(reduce((r, v) => r + v, [], "ABC")).toBe("ABC");
  });

  test("reduce sum", () => {
    const n = 300;
    const numbers = Array.from(new Array(n), (_, i) => i);
    expect(reduce((r, v) => r + v, numbers, 0)).toBe(n*(n-1)/2);
  });

  test("reduce concat", () => {
    const alphabet = Array.from(new Array(26), (_,i) => String.fromCharCode(i + "a".charCodeAt(0)) )
    expect(reduce((r, v) => r + v, alphabet, "")).toBe("abcdefghijklmnopqrstuvwxyz");
  });

  test("reduce concat reversse", () => {
    const alphabet = Array.from(new Array(26), (_,i) => String.fromCharCode(i + "a".charCodeAt(0)) )
    expect(reduce((r, v) => v + r, alphabet, "")).toBe("zyxwvutsrqponmlkjihgfedcba");
  });
});
