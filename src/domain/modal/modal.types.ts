import { Reducer } from 'redux';

import { Actions } from 'utils/libs/store/store.types';

export enum ModalKey {
  TestModal = 'test-modal',
}

export interface ModalState {
  activeModal: ModalKey | null;
}

export enum ModalActionTypes {
  SetActiveModal = 'modal/SET_ACTIVE_MODAL',
}

export type ModalPayloads = {
  [ModalActionTypes.SetActiveModal]: ModalKey | null;
};

export type ModalActions = Actions<ModalPayloads>;

export type ModalReducer = Reducer<ModalState, ModalActions>;
