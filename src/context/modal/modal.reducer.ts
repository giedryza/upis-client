import { ModalState, ModalActionTypes, ModalReducer } from './modal.types';

export const INITIAL_STATE: ModalState = {
  activeModal: null,
};

export const reducer: ModalReducer = (state, action) => {
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
