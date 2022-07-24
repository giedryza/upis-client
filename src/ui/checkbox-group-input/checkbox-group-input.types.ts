import { ReactNode } from 'react';

export interface Props {
  items: Item[];
  value?: string[];
  onChange?: (value: string[]) => void;
  label?: string;
  disabled?: boolean;
  readonly?: boolean;
}

interface Item {
  label: ReactNode;
  value: string;
  disabled?: boolean;
  readonly?: boolean;
}
