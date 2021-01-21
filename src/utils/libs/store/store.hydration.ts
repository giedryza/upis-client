import { State } from 'types/common/redux';
import { hydrateAuth } from 'domain/auth/store.hydration';

export const hydratedState = (clientState: State, serverState: State) => {
  const nextState: State = {
    ...clientState,
    auth: hydrateAuth(clientState, serverState),
  };

  return nextState;
};
