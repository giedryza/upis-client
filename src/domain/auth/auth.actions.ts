import { AuthActionTypes, Session, User } from './auth.types';

export const setUser = (user: User | null) => ({
  type: AuthActionTypes.SetUser,
  payload: user,
});

export const setSession = (session: Session) => ({
  type: AuthActionTypes.SetSession,
  payload: session,
});

export const clearSession = () => ({
  type: AuthActionTypes.ClearSession,
});

export const setLoading = (flag: boolean) => ({
  type: AuthActionTypes.SetLoading,
  payload: flag,
});
