export interface Props {
  label?: string;
  name?: string;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  readonly?: boolean;
}
