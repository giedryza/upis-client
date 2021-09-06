import { State } from 'types/common/redux';

export const selectIsCompanyExist = (state: State) => !!state.companies.company;

export const selectCurrentStep = (state: State) => state.companies.step;

export const selectIsCompaniesLoading = (state: State) =>
  state.companies.loading;
