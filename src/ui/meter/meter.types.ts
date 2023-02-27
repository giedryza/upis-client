export interface Props {
  label?: string;
  ariaLabel?: string;
  valueLabel?: string;
  id?: string;
  value?: number;
  min?: number;
  max?: number;
  formatOptions?: Intl.NumberFormatOptions;
  variant?: 'primary' | 'neutral';
}
