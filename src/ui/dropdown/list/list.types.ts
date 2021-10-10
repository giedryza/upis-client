import { Props as ButtonProps } from 'ui/button/button.component';
import { DropdownKey } from 'domain/dropdown/dropdown.types';

export type MenuItem = Pick<ButtonProps, 'label' | 'icon' | 'url'> & {
  onClick?: () => void;
};

export interface Props {
  id: DropdownKey;
  items: MenuItem[];
}
