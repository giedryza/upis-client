import {
  createStore,
  applyMiddleware,
  Middleware,
  Reducer,
  StoreEnhancer,
} from 'redux';
import thunk from 'redux-thunk';
import { createWrapper, HYDRATE, MakeStore, Context } from 'next-redux-wrapper';

import { State } from './store.types';
import { rootReducer } from './store.reducer';

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

  private reducer: Reducer<State> = (state, action): State => {
    if (action.type === HYDRATE) {
      const nextState = {
        ...state, // use previous state
        ...action.payload, // apply delta from hydration
      };

      return nextState;
    }

    return rootReducer(state, action);
  };

  private makeStore: MakeStore<State> = (_context: Context) =>
    createStore(this.reducer, this.enhancer);

  wrapper = createWrapper<State>(this.makeStore);
}

export const store = new Store();
