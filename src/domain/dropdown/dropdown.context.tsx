import { FC, useReducer, useMemo } from 'react';

import { reducer, INITIAL_STATE } from './dropdown.reducer';
import { DropdownContext } from './dropdown.types';
import { useDropdownActions } from './dropdown.actions';

import { makeContext } from 'utils/context/make-context';

const [
  useDropdownContext,
  DropdownContextProvider,
] = makeContext<DropdownContext>();

const DropdownProvider: FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  const actions = useDropdownActions(dispatch);

  const value = useMemo(
    () => ({
      dropdownState: state,
      dropdownActions: actions,
    }),
    [state, actions]
  );

  return (
    <DropdownContextProvider value={value}>{children}</DropdownContextProvider>
  );
};

export { DropdownProvider, useDropdownContext };
