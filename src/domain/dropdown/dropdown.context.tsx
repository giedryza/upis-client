import { FC, useReducer } from 'react';

import { reducer, INITIAL_STATE } from './dropdown.reducer';
import { DropdownState, DropdownDispatch } from './dropdown.types';

import { contextFactory } from 'utils/context/context-factory';

const [
  useDropdownState,
  DropdownStateProvider,
] = contextFactory<DropdownState>();
const [
  useDropdownDispatch,
  DropdownDispatchProvider,
] = contextFactory<DropdownDispatch>();

const useDropdownContext = () => ({
  dropdownState: useDropdownState(),
  dropdownDispatch: useDropdownDispatch(),
});

const DropdownProvider: FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  return (
    <DropdownStateProvider value={state}>
      <DropdownDispatchProvider value={dispatch}>
        {children}
      </DropdownDispatchProvider>
    </DropdownStateProvider>
  );
};

export { DropdownProvider, useDropdownContext };
