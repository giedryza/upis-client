export type SetError<T extends Record<string, unknown>> = (
  name: keyof T,
  error: { message: string; shouldFocus: boolean }
) => void;
