import {
  CompaniesActionTypes,
  CompaniesReducer,
  CompaniesState,
} from 'domain/companies/companies.types';

const INITIAL_STATE: CompaniesState = {
  company: null,
  step: 1,
  loading: false,
};

const reducer: CompaniesReducer = (
  state = INITIAL_STATE,
  action
): CompaniesState => {
  switch (action.type) {
    case CompaniesActionTypes.SetCompany:
      return {
        ...state,
        company: action.payload,
      };

    case CompaniesActionTypes.SetStep:
      return {
        ...state,
        step: action.payload,
      };

    case CompaniesActionTypes.SetLoading:
      return {
        ...state,
        loading: action.payload,
      };

    case CompaniesActionTypes.ClearCompany:
      return {
        ...state,
        company: INITIAL_STATE.company,
        step: INITIAL_STATE.step,
        loading: INITIAL_STATE.loading,
      };

    default:
      return state;
  }
};

export default reducer;
