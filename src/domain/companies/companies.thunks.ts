import { PromiseThunk, Thunk, ThunkResponse } from 'types/common/redux';
import { Company } from 'domain/companies/companies.types';
import { Http } from 'utils/libs/http/http.lib';
import { Response } from 'utils/libs/http/http.types';
import { endpoints } from 'uri/endpoints';
import { Errors } from 'utils/libs/errors/errors.lib';
import {
  selectCurrentStep,
  selectMyCompany,
} from 'domain/companies/companies.selectors';
import { COMPANY_FORM_TOTAL_STEPS } from 'domain/companies/companies.constants';
import { actions } from 'domain/actions';
import { thunks } from 'domain/thunks';

export const getMyCompany = (): Thunk => async (dispatch) => {
  try {
    dispatch(actions.companies.setLoading(true));

    const { data } = await new Http<Response<Company | null>>(
      endpoints.companies.me
    ).get();

    dispatch(actions.companies.setCompany(data));
  } catch (error) {
    new Errors(error).handleApi();
  } finally {
    dispatch(actions.companies.setLoading(false));
  }
};

export const updateStep = (): Thunk => (dispatch, getState) => {
  const state = getState();

  const currentStep = selectCurrentStep(state);
  const nextStep = currentStep < COMPANY_FORM_TOTAL_STEPS ? currentStep + 1 : 1;

  dispatch(actions.companies.setStep(nextStep));
};

export const updateMyCompany = (
  id: string,
  form: Partial<
    Pick<
      Company,
      'name' | 'phone' | 'email' | 'description' | 'website' | 'address'
    >
  >
): PromiseThunk<ThunkResponse> => async (dispatch) => {
  try {
    dispatch(actions.companies.setLoading(true));

    const { data } = await new Http<Response<Company>>(
      endpoints.companies.one.replace(':id', id),
      {
        body: { ...form },
      }
    ).patch();

    dispatch(actions.companies.setCompany(data));

    return { success: true };
  } catch (error) {
    new Errors(error).handleApi();

    return { success: false };
  } finally {
    dispatch(actions.companies.setLoading(false));
  }
};

export const createMyCompany = (
  form: Pick<Company, 'name' | 'phone' | 'email' | 'description'>
): PromiseThunk<ThunkResponse> => async (dispatch) => {
  try {
    dispatch(actions.companies.setLoading(true));

    const { data } = await new Http<Response<Company>>(
      endpoints.companies.index,
      {
        body: { ...form },
      }
    ).post();

    dispatch(actions.companies.setCompany(data));

    return { success: true };
  } catch (error) {
    new Errors(error).handleApi();

    return { success: false };
  } finally {
    dispatch(actions.companies.setLoading(false));
  }
};

export const submitInitialStep = (
  form: Pick<Company, 'name' | 'phone' | 'email' | 'description'>
): Thunk => async (dispatch, getState) => {
  const company = selectMyCompany(getState());

  const { success } = company
    ? await dispatch(thunks.companies.updateMyCompany(company._id, form))
    : await dispatch(thunks.companies.createMyCompany(form));

  if (success) {
    dispatch(thunks.companies.updateStep());
  }
};

export const submitAdditionalStep = (
  form: Pick<Company, 'name' | 'phone' | 'email' | 'description'>
): Thunk => async (dispatch, getState) => {
  const company = selectMyCompany(getState());

  if (!company) return;

  const { success } = await dispatch(
    thunks.companies.updateMyCompany(company._id, form)
  );

  if (success) {
    dispatch(thunks.companies.updateStep());
  }
};
