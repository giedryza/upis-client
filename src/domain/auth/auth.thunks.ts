import { IncomingMessage } from 'http';
import Router from 'next/router';

import { authActions } from 'domain/auth/auth.actions';
import { AuthActionTypes, AuthPayloads, Session } from 'domain/auth/auth.types';
import { Errors } from 'utils/libs/errors/errors.lib';
import { Http } from 'utils/libs/http/http.lib';
import { Response } from 'utils/libs/http/http.types';
import { endpoints } from 'uri/endpoints';
import { routes } from 'uri/routes';
import { PromiseThunk } from 'types/common/redux';

export const getSession = (req?: IncomingMessage): PromiseThunk => async (
  dispatch
) => {
  try {
    dispatch(authActions.setLoading(true));

    const { data } = await new Http<Response<Session>>(endpoints.users.me, {
      req,
    }).get();

    dispatch(authActions.setSession(data));
  } catch (error) {
    dispatch(authActions.clearSession());

    new Errors(error).handleApi();
  } finally {
    dispatch(authActions.setLoading(false));
  }
};

export const signin = ({
  email,
  password,
}: AuthPayloads[AuthActionTypes.Signin]): PromiseThunk<void> => async (
  dispatch
) => {
  try {
    dispatch(authActions.setLoading(true));

    const { data } = await new Http<Response<Session>>(endpoints.users.signin, {
      body: { email, password },
    }).post();

    dispatch(authActions.setSession(data));
    Router.push(routes.home);
  } catch (error) {
    new Errors(error).handleApi();
  } finally {
    dispatch(authActions.setLoading(false));
  }
};
