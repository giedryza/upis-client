export interface Props {
  label?: string;
  value?: string[];
  onChange?: (value: string[]) => void;
  disabled?: boolean;
  readonly?: boolean;
}
