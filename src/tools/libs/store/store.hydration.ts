import { State } from 'types/common/redux';

export const hydratedState = (clientState: State, _serverState: State) => {
  const nextState: State = {
    ...clientState,
  };

  return nextState;
};
