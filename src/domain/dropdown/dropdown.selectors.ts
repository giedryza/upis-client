import { DropdownKey, DropdownState } from './dropdown.types';

export const isDropdownActive = (state: DropdownState, key: DropdownKey) =>
  state.activeDropdown === key;
