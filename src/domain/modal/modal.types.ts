import { Dispatch } from 'react';

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

export type ModalDispatch = Dispatch<Action<ModalPayloads>>;
