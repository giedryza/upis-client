import { ChangeEvent, FocusEvent } from 'react';

export interface DropdownOption {
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
  multiple?: boolean;
  onChange?: (e: ChangeEvent<HTMLSelectElement>) => void;
  onFocus?: (e: FocusEvent<HTMLSelectElement>) => void;
  onBlur?: (e: FocusEvent<HTMLSelectElement>) => void;
  error?: string;
  info?: string;
}
