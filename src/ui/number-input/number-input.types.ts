export interface Props {
  label: string;
  placeholder?: string;
  name?: string;
  value?: number;
  onChange?: (value: number) => void;
  disabled?: boolean;
  readonly?: boolean;
  min?: number;
  max?: number;
  step?: number;
  error?: string;
  info?: string;
  autofocus?: boolean;
  stepper?: boolean;
  textAlign?: 'left' | 'center';
  formatOptions?: Intl.NumberFormatOptions;
}
