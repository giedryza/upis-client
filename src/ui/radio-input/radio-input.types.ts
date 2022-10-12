import { ReactNode } from 'react';

export interface Props {
  items: Item[];
  label?: string;
  name?: string;
  value?: string;
  onChange?: (value: string) => void;
  info?: string;
  error?: string;
  disabled?: boolean;
  readonly?: boolean;
}

interface Item {
  label: ReactNode;
  value: string;
  disabled?: boolean;
}
