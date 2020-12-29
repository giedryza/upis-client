import {
  DropdownState,
  DropdownActionTypes,
  DropdownReducer,
} from './dropdown.types';

export const INITIAL_STATE: DropdownState = {
  activeDropdown: null,
};

export const reducer: DropdownReducer = (state, action) => {
  switch (action.type) {
    case DropdownActionTypes.SetActiveDropdown:
      return {
        ...state,
        activeDropdown: action.payload,
      };
    default:
      return state;
  }
};
