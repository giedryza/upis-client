import { FC, useReducer, useMemo } from 'react';

import { reducer, INITIAL_STATE } from './auth.reducer';
import { AuthContext } from './auth.types';
import { useAuthActions } from './auth.actions';

import { contextFactory } from 'utils/context/context-factory';

const [useAuthContext, AuthContextProvider] = contextFactory<AuthContext>();

const AuthProvider: FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  const actions = useAuthActions(dispatch);

  const value = useMemo(
    () => ({
      authState: state,
      authActions: actions,
    }),
    [state, actions]
  );

  return <AuthContextProvider value={value}>{children}</AuthContextProvider>;
};

export { AuthProvider, useAuthContext };
