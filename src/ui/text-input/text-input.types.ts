import { ChangeEvent, FocusEvent } from 'react';

export type InputElement = HTMLInputElement | HTMLTextAreaElement;

export interface Props {
  name: string;
  label: string;
  type?: 'text' | 'textarea' | 'number' | 'email' | 'password' | 'date';
  inputmode?: JSX.IntrinsicElements['input']['inputMode'];
  disabled?: boolean;
  readonly?: boolean;
  value?: string;
  onChange?: (e: ChangeEvent<InputElement>) => void;
  onFocus?: (e: FocusEvent<InputElement>) => void;
  onBlur?: (e: FocusEvent<InputElement>) => void;
  error?: string;
  info?: string;
  placeholder?: string;
  rows?: number;
  autofocus?: boolean;
}
