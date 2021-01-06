import { Session, AuthActionTypes, AuthDispatch } from './auth.types';

export const useAuthActions = (dispatch: AuthDispatch) => {
  const setSession = (session: Session | null) =>
    dispatch({
      type: AuthActionTypes.SetSession,
      payload: session,
    });

  return { setSession };
};
