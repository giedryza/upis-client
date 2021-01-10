import {
  DropdownState,
  DropdownActionTypes,
  DropdownReducer,
} from './dropdown.types';

const INITIAL_STATE: DropdownState = {
  activeDropdown: null,
};

const reducer: DropdownReducer = (
  state = INITIAL_STATE,
  action
): DropdownState => {
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

export default reducer;
