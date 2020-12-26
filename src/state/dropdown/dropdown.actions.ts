import { useCallback } from 'react';

import {
  DropdownDispatch,
  DropdownActionTypes,
  DropdownKey,
} from './dropdown.types';

const dropdownActions = {
  setActiveDropdown: (key: DropdownKey | null) => ({
    type: DropdownActionTypes.SetActiveDropdown,
    payload: key,
  }),
};

export const useDropdownActions = (dispatch: DropdownDispatch) => {
  const setActiveDropdown = useCallback(
    (key: DropdownKey | null) =>
      dispatch(dropdownActions.setActiveDropdown(key)),
    [dispatch]
  );

  return { setActiveDropdown };
};
