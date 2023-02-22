import { ButtonProps } from 'ui';

export interface Props {
  id: string;
  menuButton: ButtonProps;
  items: ButtonProps[];
  position?: `${'top' | 'bottom'}-${'left' | 'right'}`;
}
