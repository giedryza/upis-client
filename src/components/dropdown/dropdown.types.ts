import { DropdownKey } from 'domain/dropdown/dropdown.types';
import { MenuButton } from 'ui/dropdown/dropdown.component';

export interface Props {
  id: DropdownKey;
  menuButton: MenuButton;
  position?: `${'top' | 'bottom'}-${'left' | 'right'}`;
}
