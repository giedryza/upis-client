import { ModalState, ModalActions, ModalActionTypes } from './modal.types';

import { Reducer } from 'utils/context/types';

export const INITIAL_STATE: ModalState = {
  activeModal: null,
};

export const reducer: Reducer<ModalState, ModalActions> = (state, action) => {
  switch (action.type) {
    case ModalActionTypes.SetActiveModal:
      return {
        ...state,
        activeModal: action.payload,
      };
    default:
      return state;
  }
};
