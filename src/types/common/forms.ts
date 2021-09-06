import { RegisterOptions } from 'react-hook-form';

export type ValidationRules<T> = Partial<Record<keyof T, RegisterOptions>>;

export type ErrorMessages<T> = Partial<Record<keyof T, string>>;

export type SetError<T extends Record<string, unknown>> = (
  name: keyof T,
  error: { message: string; shouldFocus: boolean }
) => void;
