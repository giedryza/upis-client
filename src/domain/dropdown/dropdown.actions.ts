import { DropdownActionTypes, DropdownKey } from './dropdown.types';

export const dropdownActions = {
  setActiveDropdown: (key: DropdownKey | null) => ({
    type: DropdownActionTypes.SetActiveDropdown as const,
    payload: key,
  }),
};
