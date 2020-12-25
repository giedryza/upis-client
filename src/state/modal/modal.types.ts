import { Action, Reducer } from 'utils/context/types';

export enum ModalKey {
  TestModal = 'test-modal',
}

export interface ModalState {
  activeModal: ModalKey | null;
}

export enum ModalActionTypes {
  SetActiveModal,
}

export type ModalPayloads = {
  [ModalActionTypes.SetActiveModal]: ModalKey | null;
};

export type ModalActions = Action<ModalPayloads>;

export type ModalReducer = Reducer<ModalState, ModalPayloads>;

export interface ModalContext {
  modalState: ModalState;
  modalActions: {
    setActiveModal: (key: ModalKey | null) => void;
  };
}
