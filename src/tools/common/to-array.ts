export const toArray = <Value extends unknown>(value: Value): Value[] =>
  Array.isArray(value) ? value : [value];
