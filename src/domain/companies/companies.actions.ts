import {
  CompaniesActionTypes,
  CompaniesPayloads,
} from 'domain/companies/companies.types';

export const companiesActions = {
  setCompany: (
    payload: CompaniesPayloads[CompaniesActionTypes.SetCompany]
  ) => ({
    type: CompaniesActionTypes.SetCompany,
    payload,
  }),
  setStep: (payload: CompaniesPayloads[CompaniesActionTypes.SetStep]) => ({
    type: CompaniesActionTypes.SetStep,
    payload,
  }),
  setLoading: (
    payload: CompaniesPayloads[CompaniesActionTypes.SetLoading]
  ) => ({
    type: CompaniesActionTypes.SetLoading,
    payload,
  }),
  clearCompany: () => ({
    type: CompaniesActionTypes.ClearCompany,
  }),
};
