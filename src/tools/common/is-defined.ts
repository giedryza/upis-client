export const isDefined = <Value>(
  value: Value | null | undefined
): value is Value => value !== undefined && value !== null;
