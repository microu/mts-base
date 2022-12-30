export function reduce<T, U>(
  rf: (r: U, x: T) => U,
  iter: Iterable<T>,
  initValue: U
): U {
  let u = initValue;
  for (const x of iter) {
    u = rf(u, x);
  }
  return u;
}
