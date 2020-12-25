export enum ModalKey {
  TestModal = 'test-modal',
}

export interface ModalState {
  activeModal: ModalKey | null;
}

export enum ModalActionTypes {
  SetActiveModal,
}

export type ModalActions = {
  [ModalActionTypes.SetActiveModal]: ModalKey | null;
};

export interface ModalContext {
  modalState: ModalState;
  modalActions: {
    setActiveModal: (key: ModalKey | null) => void;
  };
}
