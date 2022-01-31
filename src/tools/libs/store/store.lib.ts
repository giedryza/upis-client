import {
  createStore,
  applyMiddleware,
  Store as ReduxStore,
  Middleware,
  Reducer,
  StoreEnhancer,
} from 'redux';
import thunk from 'redux-thunk';
import { createWrapper, HYDRATE, Context } from 'next-redux-wrapper';

import { State } from 'types/common/redux';

import { rootReducer } from './store.reducer';
import { hydratedState } from './store.hydration';

class Store {
  private middlewares: Middleware[] = [thunk];

  private get enhancer(): StoreEnhancer {
    if (process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line global-require
      const { composeWithDevTools } = require('redux-devtools-extension');

      return composeWithDevTools(applyMiddleware(...this.middlewares));
    }

    return applyMiddleware(...this.middlewares);
  }

  private reducer: Reducer = (state: State, action): State => {
    if (action.type === HYDRATE) {
      const serverState: State = { ...action.payload };

      return hydratedState(state, serverState);
    }

    return rootReducer(state, action);
  };

  private makeStore = (_context: Context) =>
    createStore(this.reducer, this.enhancer);

  wrapper = createWrapper<ReduxStore<State>>(this.makeStore);
}

export const reduxStore = new Store();
