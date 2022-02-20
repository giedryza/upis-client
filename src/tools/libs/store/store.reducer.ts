import { combineReducers } from 'redux';

import dropdown from 'domain/dropdown/dropdown.reducer';
import modal from 'domain/modal/modal.reducer';

export const rootReducer = combineReducers({
  dropdown,
  modal,
});

export type RootState = ReturnType<typeof rootReducer>;
