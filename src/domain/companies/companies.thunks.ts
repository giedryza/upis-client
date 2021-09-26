import { PromiseThunk, Thunk, ThunkResponse } from 'types/common/redux';
import { Company, CompanyFormStep } from 'domain/companies/companies.types';
import { Http } from 'utils/libs/http/http.lib';
import { Response } from 'utils/libs/http/http.types';
import { endpoints } from 'uri/endpoints';
import { Errors } from 'utils/libs/errors/errors.lib';
import {
  selectCurrentStep,
  selectMyCompany,
} from 'domain/companies/companies.selectors';
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
  const step = selectCurrentStep(getState());

  const getNextStep = () => {
    switch (step) {
      case CompanyFormStep.Info:
        return CompanyFormStep.Network;
      case CompanyFormStep.Network:
        return CompanyFormStep.Logo;
      case CompanyFormStep.Logo:
        return CompanyFormStep.Location;
      case CompanyFormStep.Location:
      case CompanyFormStep.Tours:
        return CompanyFormStep.Tours;
      default:
        return CompanyFormStep.Info;
    }
  };

  dispatch(actions.companies.setStep(getNextStep()));
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
  form: Partial<
    Pick<
      Company,
      'name' | 'phone' | 'email' | 'description' | 'website' | 'address'
    >
  >
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
