import { Dispatch, useCallback } from 'react';

import { ModalPayloads, ModalActionTypes, ModalKey } from './modal.types';

import { Action } from 'utils/context/types';

export const modalActions = {
  setActiveModal: (key: ModalKey | null) => ({
    type: ModalActionTypes.SetActiveModal,
    payload: key,
  }),
};

export const useModalActions = (dispatch: Dispatch<Action<ModalPayloads>>) => {
  const setActiveModal = useCallback(
    (key: ModalKey | null) => dispatch(modalActions.setActiveModal(key)),
    [dispatch]
  );

  return { setActiveModal };
};
