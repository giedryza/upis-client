import { ModalActionTypes, ModalKey } from './modal.types';

export const setActiveModal = (key: ModalKey | null) => ({
  type: ModalActionTypes.SetActiveModal,
  payload: key,
});
