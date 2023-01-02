import { ReactNode } from 'react';

export interface Props {
  label: ReactNode;
  id?: string;
  value?: [number, number];
  onChange?: (value: [number, number]) => void;
  disabled?: boolean;
  min?: number;
  max?: number;
  step?: number;
  formatOptions?: Intl.NumberFormatOptions;
}
