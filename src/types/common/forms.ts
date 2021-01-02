import { RegisterOptions } from 'react-hook-form';

export type ValidationRules<T> = Partial<Record<keyof T, RegisterOptions>>;
