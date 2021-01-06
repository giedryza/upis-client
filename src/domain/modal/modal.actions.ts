import { useCallback } from 'react';

import { ModalDispatch, ModalActionTypes, ModalKey } from './modal.types';

export const useModalActions = (dispatch: ModalDispatch) => {
  const setActiveModal = useCallback(
    (key: ModalKey | null) =>
      dispatch({
        type: ModalActionTypes.SetActiveModal,
        payload: key,
      }),
    [dispatch]
  );

  return { setActiveModal };
};
