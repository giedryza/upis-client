import { State } from 'types/common/redux';

export const hydrateAuth = (clientState: State, serverState: State) => {
  const auth = serverState.auth.timestamp
    ? {
        ...clientState.auth,
        user: serverState.auth.user,
        timestamp: serverState.auth.timestamp,
      }
    : {
        ...clientState.auth,
      };

  return auth;
};
