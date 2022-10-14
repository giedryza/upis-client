import { ChangeEvent } from 'react';

export type InputElement = HTMLInputElement | HTMLTextAreaElement;

export interface Props {
  name: string;
  label: string;
  type?:
    | 'text'
    | 'textarea'
    | 'number'
    | 'email'
    | 'password'
    | 'date'
    | 'url'
    | 'phone';
  inputmode?: JSX.IntrinsicElements['input']['inputMode'];
  disabled?: boolean;
  readonly?: boolean;
  value?: string;
  onChange?: (e: ChangeEvent<InputElement>) => void;
  error?: string;
  info?: string;
  placeholder?: string;
  rows?: number;
  autofocus?: boolean;
}
