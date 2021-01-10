import { ModalActionTypes, ModalKey } from './modal.types';

export const modalActions = {
  setActiveModal: (key: ModalKey | null) => ({
    type: ModalActionTypes.SetActiveModal,
    payload: key,
  }),
};
