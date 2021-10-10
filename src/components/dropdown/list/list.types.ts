import { DropdownKey } from 'domain/dropdown/dropdown.types';
import { MenuItem } from 'ui/dropdown/list/list.component';

export interface Props {
  id: DropdownKey;
  items: MenuItem[];
}
