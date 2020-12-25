import { FC, useReducer, useMemo, useCallback } from 'react';

import { reducer, INITIAL_STATE } from './modal.reducer';
import { ModalContext, ModalKey, ModalActionTypes } from './modal.types';

import { makeContext } from 'utils/context/make-context';

export const [
  useModalContext,
  ModalContextProvider,
] = makeContext<ModalContext>();

export const ModalProvider: FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  const setActiveModal = useCallback((key: ModalKey | null) => {
    dispatch({ type: ModalActionTypes.SetActiveModal, payload: key });
  }, []);

  const value = useMemo(
    () => ({
      modalState: state,
      modalActions: {
        setActiveModal,
      },
    }),
    [state, setActiveModal]
  );

  return <ModalContextProvider value={value}>{children}</ModalContextProvider>;
};
