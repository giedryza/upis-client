import { ButtonProps, ButtonAttributes } from 'ui';

export type MenuItem = Pick<ButtonProps, 'label' | 'icon' | 'url'> & {
  onClick?: () => void;
  attributes?: ButtonAttributes;
};

export interface Props {
  menuButton: Omit<ButtonProps, 'url' | 'attributes'>;
  items: MenuItem[];
  position?: `${'top' | 'bottom'}-${'left' | 'right'}`;
}
