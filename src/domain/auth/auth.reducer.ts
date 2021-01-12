import { AuthState, AuthActionTypes, AuthReducer } from './auth.types';

const INITIAL_STATE: AuthState = {
  user: null,
  timestamp: null,
  loading: false,
};

const reducer: AuthReducer = (state = INITIAL_STATE, action): AuthState => {
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

    case AuthActionTypes.ClearSession:
      return {
        ...state,
        user: null,
        timestamp: null,
      };

    case AuthActionTypes.SetLoading:
      return {
        ...state,
        loading: action.payload,
      };

    default:
      return state;
  }
};

export default reducer;
