import { RegisterOptions } from 'react-hook-form';

export type ValidationRules<T> = Partial<Record<keyof T, RegisterOptions>>;

export type SetError<T extends Record<string, unknown>> = (
  name: keyof T,
  error: { message: string; shouldFocus: boolean }
) => void;
