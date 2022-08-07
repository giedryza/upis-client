export interface Props {
  label?: string;
  name?: string;
  value?: string;
  onChange?: (value: string) => void;
  error?: string;
  disabled?: boolean;
  readonly?: boolean;
}
