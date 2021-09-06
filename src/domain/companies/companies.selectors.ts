import { State } from 'types/common/redux';

export const selectMyCompany = (state: State) => state.companies.company;

export const selectIsMyCompanyExist = (state: State) =>
  !!selectMyCompany(state);

export const selectCurrentStep = (state: State) => state.companies.step;

export const selectIsCompaniesLoading = (state: State) =>
  state.companies.loading;
