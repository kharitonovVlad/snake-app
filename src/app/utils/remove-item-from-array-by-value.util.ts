export function removeItem<T>(array: T[], valueToRemove: T): T[] {
  const index = array.indexOf(valueToRemove);
  if (index !== -1) {
    array.splice(index, 1);
  }

  return array;
}
