import { AuthState } from 'domain/auth/auth.types';
import { nowInSeconds } from 'utils/common/date-time';

export const isSessionExpired = (state: AuthState) => {
  if (!state.timestamp?.exp) return false;

  return nowInSeconds() > state.timestamp.exp;
};
