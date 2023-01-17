export const isLast = <T extends any[] = any[]>(self: T, i: number): boolean =>
  i + 1 === self.length;
