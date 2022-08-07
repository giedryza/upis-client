import { ReactNode } from 'react';

export interface Props {
  label: ReactNode;
  value: string;
  error?: boolean;
  disabled?: boolean;
  readonly?: boolean;
}
