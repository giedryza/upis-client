import { AuthActionTypes, AuthReducer, AuthState } from './auth.types';

export const INITIAL_STATE: AuthState = {
  user: null,
  timestamp: null,
};

export const reducer: AuthReducer = (state, action): AuthState => {
  switch (action.type) {
    case AuthActionTypes.SetSession:
      if (!action.payload) {
        return {
          ...state,
          user: null,
          timestamp: null,
        };
      }

      const { user, timestamp } = action.payload;

      return {
        ...state,
        user,
        timestamp,
      };
    default:
      return state;
  }
};
