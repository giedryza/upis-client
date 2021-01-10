import { AuthActionTypes, Session, User } from './auth.types';

export const authActions = {
  setUser: (user: User | null) => ({
    type: AuthActionTypes.SetUser,
    payload: user,
  }),
  setSession: (session: Session) => ({
    type: AuthActionTypes.SetSession,
    payload: session,
  }),
  clearSession: () => ({
    type: AuthActionTypes.ClearSession,
  }),
};
