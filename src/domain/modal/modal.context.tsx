import { FC, useReducer } from 'react';

import { reducer, INITIAL_STATE } from './modal.reducer';
import { ModalState, ModalDispatch } from './modal.types';

import { contextFactory } from 'utils/context/context-factory';

const [useModalState, ModalStateProvider] = contextFactory<ModalState>();
const [
  useModalDispatch,
  ModalDispatchProvider,
] = contextFactory<ModalDispatch>();

const useModalContext = () => ({
  modalState: useModalState(),
  modalDispatch: useModalDispatch(),
});

const ModalProvider: FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  return (
    <ModalStateProvider value={state}>
      <ModalDispatchProvider value={dispatch}>{children}</ModalDispatchProvider>
    </ModalStateProvider>
  );
};

export { ModalProvider, useModalContext };
