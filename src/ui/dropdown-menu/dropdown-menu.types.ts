import { ButtonProps } from 'ui/button';

export type MenuItem = Pick<ButtonProps, 'label' | 'icon' | 'url'> & {
  onClick?: () => void;
};

export interface Props {
  menuButton: Omit<ButtonProps, 'url' | 'attributes'>;
  items: MenuItem[];
  position?: `${'top' | 'bottom'}-${'left' | 'right'}`;
}
