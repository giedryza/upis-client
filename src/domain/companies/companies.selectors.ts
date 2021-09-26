import { State } from 'types/common/redux';
import { Company, CompanyFormStep } from 'domain/companies/companies.types';

export const selectMyCompany = (state: State): Company | null =>
  state.companies.company;

export const selectIsMyCompanyExist = (state: State): boolean =>
  !!selectMyCompany(state);

export const selectCurrentStep = (state: State): CompanyFormStep =>
  state.companies.step;

export const selectIsCompaniesLoading = (state: State): boolean =>
  state.companies.loading;
