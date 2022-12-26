export function characterList(firstChar: string, n: number): string;
export function characterList(
  firstChar: string,
  n: number,
  asArray: false
): string;
export function characterList(
  firstChar: string,
  n: number,
  asArray: true
): string[];
export function characterList(
  firstChar: string,
  n: number,
  asArray: boolean = false
): string | string[] {
  const arr = Array.from(new Array(n), (_, i) =>
    String.fromCharCode(firstChar.charCodeAt(0) + i)
  );
  if (asArray) {
    return arr;
  } else {
    return arr.join("");
  }
}
