import { AppState } from 'tools/services/store';

import { ModalName } from './modal.types';

const selectActiveModal = (state: AppState): ModalName | null =>
  state.modal.activeModal;

export const selectIsModalActive =
  (modalName: ModalName) =>
  (state: AppState): boolean =>
    selectActiveModal(state) === modalName;
