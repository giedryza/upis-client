import { ChangeEvent } from 'react';

interface DropdownOption {
  label: string;
  value: string;
}

export interface Props {
  options: DropdownOption[];
  name?: string;
  value?: string;
  label?: string;
  ariaLabel?: string;
  placeholder?: string;
  disabled?: boolean;
  readonly?: boolean;
  onChange?: (e: ChangeEvent<HTMLSelectElement>) => void;
  error?: string;
  info?: string;
}
