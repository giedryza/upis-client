export const breakpoints = ['xs', 'sm', 'md', 'lg'] as const;

export type Breakpoint = typeof breakpoints[number];
