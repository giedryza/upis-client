import { ReactNode } from 'react';

export interface Props {
  label: ReactNode;
  id?: string;
  value?: number;
  onChange?: (value: number) => void;
  disabled?: boolean;
  min?: number;
  max?: number;
  step?: number;
  formatOptions?: Intl.NumberFormatOptions;
}
