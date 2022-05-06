import { AppState } from 'tools/services/store';

import { ModalName } from './modal.types';

export const selectIsModalActive =
  (modalName: ModalName) => (state: AppState) =>
    state.modal.activeModal === modalName;
