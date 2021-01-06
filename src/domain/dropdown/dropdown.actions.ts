import {
  DropdownDispatch,
  DropdownActionTypes,
  DropdownKey,
} from './dropdown.types';

export const useDropdownActions = (dispatch: DropdownDispatch) => {
  const setActiveDropdown = (key: DropdownKey | null) =>
    dispatch({
      type: DropdownActionTypes.SetActiveDropdown,
      payload: key,
    });

  return { setActiveDropdown };
};
