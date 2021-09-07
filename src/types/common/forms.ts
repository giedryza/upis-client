import {
  RegisterOptions,
  SubmitHandler,
  UseFormRegisterReturn,
} from 'react-hook-form';

export type ValidationRules<T> = Partial<Record<keyof T, RegisterOptions>>;

export type UseFormBase<T extends Record<string, unknown>> = (
  onSubmit: SubmitHandler<T>,
  values: T
) => {
  handleSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
  refs: Record<keyof T, UseFormRegisterReturn>;
  errorMessages: Partial<Record<keyof T, string>>;
  isDisabled: boolean;
};

export type SetError<T extends Record<string, unknown>> = (
  name: keyof T,
  error: { message: string; shouldFocus: boolean }
) => void;
