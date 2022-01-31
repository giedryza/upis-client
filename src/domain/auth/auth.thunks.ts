import { IncomingMessage } from 'http';
import Router from 'next/router';

import { AuthActionTypes, AuthPayloads, Session } from 'domain/auth/auth.types';
import { Errors } from 'tools/libs/errors/errors.lib';
import { Http } from 'tools/libs/http/http.lib';
import { Response } from 'tools/libs/http/http.types';
import { endpoints } from 'config/endpoints';
import { routes } from 'config/routes';
import { PromiseThunk } from 'types/common/redux';
import { actions } from 'domain/actions';

export const getSession =
  (req?: IncomingMessage): PromiseThunk =>
  async (dispatch) => {
    try {
      dispatch(actions.auth.setLoading(true));

      const { data } = await new Http<Response<Session>>(endpoints.users.me, {
        req,
      }).get();

      dispatch(actions.auth.setSession(data));
    } catch (error) {
      dispatch(actions.auth.clearSession());

      new Errors(error).handleApi();
    } finally {
      dispatch(actions.auth.setLoading(false));
    }
  };

export const signin =
  ({
    email,
    password,
  }: AuthPayloads[AuthActionTypes.Signin]): PromiseThunk<void> =>
  async (dispatch) => {
    try {
      dispatch(actions.auth.setLoading(true));

      const { data } = await new Http<Response<Session>>(
        endpoints.users.signin,
        {
          body: { email, password },
        }
      ).post();

      dispatch(actions.auth.setSession(data));
      Router.push(routes.home);
    } catch (error) {
      new Errors(error).handleApi();
    } finally {
      dispatch(actions.auth.setLoading(false));
    }
  };
