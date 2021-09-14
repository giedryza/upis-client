import { DropdownActionTypes, DropdownKey } from './dropdown.types';

export const setActiveDropdown = (key: DropdownKey | null) => ({
  type: DropdownActionTypes.SetActiveDropdown,
  payload: key,
});
