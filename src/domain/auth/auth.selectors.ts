import { State } from 'utils/libs/store/store.types';
import { nowInSeconds } from 'utils/common/date-time';

export const isSessionExpired = (state: State) => {
  const { timestamp } = state.auth;

  if (!timestamp?.exp) return false;

  return nowInSeconds() > timestamp.exp;
};

export const getUser = (state: State) => state.auth.user;
