import { useCallback } from 'react';

import { ModalDispatch, ModalActionTypes, ModalKey } from './modal.types';

const modalActions = {
  setActiveModal: (key: ModalKey | null) => ({
    type: ModalActionTypes.SetActiveModal,
    payload: key,
  }),
};

export const useModalActions = (dispatch: ModalDispatch) => {
  const setActiveModal = useCallback(
    (key: ModalKey | null) => dispatch(modalActions.setActiveModal(key)),
    [dispatch]
  );

  return { setActiveModal };
};
