import { ButtonProps } from 'ui/button/button.component';
import { DropdownKey } from 'domain/dropdown/dropdown.types';

export interface MenuItem {
  label: string;
  icon?: ButtonProps['icon'];
  url?: ButtonProps['url'];
  target?: ButtonProps['target'];
  onClick?: ButtonProps['onClick'];
}

export interface Props {
  id: DropdownKey;
  items: MenuItem[];
}
