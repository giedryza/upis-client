import { combineReducers } from 'redux';

import modal from 'domain/modal/modal.reducer';

export const rootReducer = combineReducers({
  modal,
});

export type RootState = ReturnType<typeof rootReducer>;
