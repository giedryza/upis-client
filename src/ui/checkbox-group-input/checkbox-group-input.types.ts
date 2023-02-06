import { ReactNode } from 'react';

export interface Props {
  items: Item[];
  label?: string;
  ariaLabel?: string;
  value?: string[];
  onChange?: (value: string[]) => void;
  info?: string;
  error?: string;
  disabled?: boolean;
  readonly?: boolean;
  variant?: 'primary' | 'neutral';
}

interface Item {
  label: ReactNode;
  value: string;
  disabled?: boolean;
  readonly?: boolean;
}
