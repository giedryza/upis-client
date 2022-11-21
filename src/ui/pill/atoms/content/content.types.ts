import { ButtonProps } from 'ui';

export interface Props {
  title: string;
  onClose?: () => void;
  actions?: (ButtonProps & { closable?: boolean })[];
}
