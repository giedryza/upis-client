export interface Props {
  label?: string;
  ariaLabel?: string;
  name?: string;
  value?: string;
  onChange?: (value: string) => void;
  info?: string;
  error?: string;
  disabled?: boolean;
}
