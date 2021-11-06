import { State } from 'types/common/redux';
import { Company, SocialLink } from 'domain/companies/companies.types';

export const selectMyCompany = (state: State): Company | null =>
  state.companies.company;

export const selectIsMyCompanyExist = (state: State): boolean =>
  !!selectMyCompany(state);

export const selectIsCompaniesLoading = (state: State): boolean =>
  state.companies.loading;

export const selectMyCompanySocialLinks = (state: State): SocialLink[] =>
  selectMyCompany(state)?.socialLinks ?? [];
