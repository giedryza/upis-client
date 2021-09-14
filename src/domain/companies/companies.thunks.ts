import { Thunk } from 'types/common/redux';
import {
  CompaniesActionTypes,
  CompaniesPayloads,
  Company,
} from 'domain/companies/companies.types';
import { companiesActions } from 'domain/companies/companies.actions';
import { Http } from 'utils/libs/http/http.lib';
import { Response } from 'utils/libs/http/http.types';
import { endpoints } from 'uri/endpoints';
import { Errors } from 'utils/libs/errors/errors.lib';
import {
  selectCurrentStep,
  selectIsMyCompanyExist,
} from 'domain/companies/companies.selectors';
import { COMPANY_FORM_TOTAL_STEPS } from 'domain/companies/companies.constants';

export const getMyCompany = (): Thunk => async (dispatch) => {
  try {
    dispatch(companiesActions.setLoading(true));

    const { data } = await new Http<Response<Company | null>>(
      endpoints.companies.me
    ).get();

    dispatch(companiesActions.setCompany(data));
  } catch (error) {
    new Errors(error).handleApi();
  } finally {
    dispatch(companiesActions.setLoading(false));
  }
};

export const updateStep = (): Thunk => (dispatch, getState) => {
  const state = getState();

  const currentStep = selectCurrentStep(state);
  const nextStep = currentStep < COMPANY_FORM_TOTAL_STEPS ? currentStep + 1 : 1;

  dispatch(companiesActions.setStep(nextStep));
};

export const updateMyCompany = (
  form: CompaniesPayloads[CompaniesActionTypes.UpdateCompany]
): Thunk => async (dispatch, getState) => {
  if (!selectIsMyCompanyExist(getState())) return;

  try {
    dispatch(companiesActions.setLoading(true));

    const { data } = await new Http<Response<Company>>(
      endpoints.companies.index,
      {
        body: { ...form },
      }
    ).post();

    dispatch(companiesActions.setCompany(data));
    dispatch(updateStep());
  } catch (error) {
    new Errors(error).handleApi();
  } finally {
    dispatch(companiesActions.setLoading(false));
  }
};

export const createMyCompany = (
  form: CompaniesPayloads[CompaniesActionTypes.CreateCompany]
): Thunk => async (dispatch, getState) => {
  if (selectIsMyCompanyExist(getState())) {
    dispatch(updateMyCompany(form));
    return;
  }

  try {
    dispatch(companiesActions.setLoading(true));

    const { data } = await new Http<Response<Company>>(
      endpoints.companies.index,
      {
        body: { ...form },
      }
    ).post();

    dispatch(companiesActions.setCompany(data));
    dispatch(updateStep());
  } catch (error) {
    new Errors(error).handleApi();
  } finally {
    dispatch(companiesActions.setLoading(false));
  }
};
