import { combineReducers } from 'redux';

import auth from 'domain/auth/auth.reducer';
import dropdown from 'domain/dropdown/dropdown.reducer';
import modal from 'domain/modal/modal.reducer';

export const rootReducer = combineReducers({
  auth,
  dropdown,
  modal,
});

export type RootState = ReturnType<typeof rootReducer>;
