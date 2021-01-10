import { DropdownKey } from './dropdown.types';

import { State } from 'utils/libs/store/store.types';

export const isDropdownActive = (state: State, key: DropdownKey) =>
  state.dropdown.activeDropdown === key;
