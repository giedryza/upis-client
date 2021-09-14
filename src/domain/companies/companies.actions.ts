import {
  CompaniesActionTypes,
  CompaniesPayloads,
} from 'domain/companies/companies.types';

export const setCompany = (
  payload: CompaniesPayloads[CompaniesActionTypes.SetCompany]
) => ({
  type: CompaniesActionTypes.SetCompany,
  payload,
});

export const setStep = (
  payload: CompaniesPayloads[CompaniesActionTypes.SetStep]
) => ({
  type: CompaniesActionTypes.SetStep,
  payload,
});

export const setLoading = (
  payload: CompaniesPayloads[CompaniesActionTypes.SetLoading]
) => ({
  type: CompaniesActionTypes.SetLoading,
  payload,
});

export const clearCompany = () => ({
  type: CompaniesActionTypes.ClearCompany,
});
