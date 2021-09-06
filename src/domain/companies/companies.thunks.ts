import { Thunk, PromiseThunk } from 'types/common/redux';
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
  selectIsCompanyExist,
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

export const createCompany = ({
  name,
  email,
  phone,
}: CompaniesPayloads[CompaniesActionTypes.CreateCompany]): PromiseThunk<Company> => async () => {
  const { data } = await new Http<Response<Company>>(
    endpoints.companies.index,
    {
      body: { name, email, phone },
    }
  ).post();

  return data;
};

export const updateCompany = (
  form: CompaniesPayloads[CompaniesActionTypes.UpdateCompany]
): PromiseThunk<Company> => async () => {
  const { data } = await new Http<Response<Company>>(
    endpoints.companies.index,
    {
      body: { name: form.name, email: form.email, phone: form.phone },
    }
  ).post();

  return data;
};

export const submitCompanyForm = ({
  form,
  setError,
}: CompaniesPayloads[CompaniesActionTypes.SubmitCompanyForm]): Thunk => async (
  dispatch,
  getState
) => {
  try {
    dispatch(companiesActions.setLoading(true));

    const company =
      !selectIsCompanyExist(getState()) && form.name && form.email && form.phone
        ? await dispatch(
            createCompany(
              form as CompaniesPayloads[CompaniesActionTypes.CreateCompany]
            )
          )
        : await dispatch(updateCompany(form));

    dispatch(companiesActions.setCompany(company));
    dispatch(updateStep());
  } catch (error) {
    new Errors(error).handleForm(setError);
  } finally {
    dispatch(companiesActions.setLoading(false));
  }
};
