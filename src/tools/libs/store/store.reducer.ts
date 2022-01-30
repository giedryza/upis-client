import { combineReducers } from 'redux';

import auth from 'domain/auth/auth.reducer';
import dropdown from 'domain/dropdown/dropdown.reducer';
import modal from 'domain/modal/modal.reducer';
import companies from 'domain/companies/companies.reducer';

export const rootReducer = combineReducers({
  auth,
  dropdown,
  modal,
  companies,
});

export type RootState = ReturnType<typeof rootReducer>;
