import { ModalState, ModalActionTypes, ModalReducer } from './modal.types';

const INITIAL_STATE: ModalState = {
  activeModal: null,
};

const reducer: ModalReducer = (state = INITIAL_STATE, action): ModalState => {
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

export default reducer;
