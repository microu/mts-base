export function shuffle<T>(arr: T[]): T[] {
  return arr
      .map((item) => ({ sortValue: Math.random(), value: item }))
      .sort((a, b) => a.sortValue - b.sortValue)
      .map((item) => item.value);
}


