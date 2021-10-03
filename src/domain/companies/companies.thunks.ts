import { PromiseThunk, Thunk, ThunkResponse } from 'types/common/redux';
import { Company } from 'domain/companies/companies.types';
import { Http } from 'utils/libs/http/http.lib';
import { Response } from 'utils/libs/http/http.types';
import { endpoints } from 'uri/endpoints';
import { Errors } from 'utils/libs/errors/errors.lib';
import { actions } from 'domain/actions';

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
