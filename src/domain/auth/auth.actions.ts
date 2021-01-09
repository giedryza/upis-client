import { AuthActionTypes, Session, User } from './auth.types';

export const authActions = {
  setSession: (session: Session) => ({
    type: AuthActionTypes.SetSession as const,
    payload: session,
  }),
  setUser: (user: User | null) => ({
    type: AuthActionTypes.SetUser as const,
    payload: user,
  }),
};
