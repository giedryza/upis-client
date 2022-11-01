import { ChangeEvent } from 'react';

interface DropdownOption {
  label: string;
  value: string;
}

export interface Props {
  name: string;
  options: DropdownOption[];
  value?: string;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  readonly?: boolean;
  onChange?: (e: ChangeEvent<HTMLSelectElement>) => void;
  error?: string;
  info?: string;
}
