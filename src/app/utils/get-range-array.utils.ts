export function getRangeArray(
  start: number,
  stop: number,
  step: number,
): number[] {
  return Array.from(
    { length: (stop - start) / step + 1 },
    (_value, index) => start + index * step,
  );
}
