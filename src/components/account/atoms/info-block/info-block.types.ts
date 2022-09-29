import { ButtonProps, IconName } from 'ui';

export interface Props {
  title: string;
  icon: IconName;
  columns?: number;
  editPage?: string;
  actions?: ButtonProps[];
}
