import { ButtonProps, IconName } from 'ui';

export interface Props {
  title: string;
  icon: IconName;
  columns?: number;
  actions?: ButtonProps[];
}
