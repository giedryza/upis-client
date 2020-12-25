import { FC, useReducer, useMemo } from 'react';

import { reducer, INITIAL_STATE } from './modal.reducer';
import { ModalContext } from './modal.types';
import { useModalActions } from './modal.actions';

import { makeContext } from 'utils/context/make-context';

export const [
  useModalContext,
  ModalContextProvider,
] = makeContext<ModalContext>();

export const ModalProvider: FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  const actions = useModalActions(dispatch);

  const value = useMemo(
    () => ({
      modalState: state,
      modalActions: actions,
    }),
    [state, actions]
  );

  return <ModalContextProvider value={value}>{children}</ModalContextProvider>;
};
