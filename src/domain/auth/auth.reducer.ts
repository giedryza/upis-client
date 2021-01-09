import { AuthActionTypes, AuthReducer, AuthState } from './auth.types';

export const INITIAL_STATE: AuthState = {
  user: null,
  timestamp: null,
};

export const reducer: AuthReducer = (state, action): AuthState => {
  switch (action.type) {
    case AuthActionTypes.SetUser:
      return {
        ...state,
        user: action.payload,
      };

    case AuthActionTypes.SetSession:
      return {
        ...state,
        user: action.payload.user,
        timestamp: action.payload.timestamp,
      };
    default:
      return state;
  }
};
