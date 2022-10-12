export interface Props {
  label?: string;
  value?: string[];
  onChange?: (value: string[]) => void;
  info?: string;
  error?: string;
  disabled?: boolean;
  readonly?: boolean;
}
