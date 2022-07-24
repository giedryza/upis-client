import { ReactNode } from 'react';

export interface Props {
  value: string;
  error?: boolean;
  disabled?: boolean;
  readonly?: boolean;
  children: ReactNode;
}
