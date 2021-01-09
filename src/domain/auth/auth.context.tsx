import { FC, useReducer } from 'react';

import { reducer, INITIAL_STATE } from './auth.reducer';
import { AuthDispatch, AuthState } from './auth.types';

import { contextFactory } from 'utils/context/context-factory';

const [useAuthState, AuthStateProvider] = contextFactory<AuthState>();
const [useAuthDispatch, AuthDispatchProvider] = contextFactory<AuthDispatch>();

const useAuthContext = () => ({
  authState: useAuthState(),
  authDispatch: useAuthDispatch(),
});

const AuthProvider: FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  return (
    <AuthStateProvider value={state}>
      <AuthDispatchProvider value={dispatch}>{children}</AuthDispatchProvider>
    </AuthStateProvider>
  );
};

export { AuthProvider, useAuthContext };
