import { ButtonProps, IconName } from 'ui';

export interface Props {
  title: string;
  message?: string;
  icon?: IconName;
  heading?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  action?: ButtonProps;
}
