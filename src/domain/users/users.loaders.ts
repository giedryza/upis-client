import { endpoints } from 'config/endpoints';
import { Request, getJsonBody, loadersFactory } from 'tools/services/request';

import { Session } from './users.types';

interface Signin {
  email: string;
  password: string;
}

interface Signup {
  email: string;
  password: string;
  confirmPassword: string;
}

interface UpdatePassword {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

interface ForgotPassword {
  email: string;
}

interface ResetPassword {
  userId: string;
  token: string;
  password: string;
}

export const { getLoaders, useLoaders } = loadersFactory((locale) => ({
  loaders: {
    signin: ({ email, password }: Signin) =>
      new Request<Session>(endpoints.users.signin, {
        body: getJsonBody({ email, password }),
        locale,
      }).post(),
    signup: ({ email, password, confirmPassword }: Signup) =>
      new Request<Session>(endpoints.users.signup, {
        body: getJsonBody({
          email,
          password,
          confirmPassword,
        }),
        locale,
      }).post(),
    updatePassword: ({
      currentPassword,
      newPassword,
      confirmPassword,
    }: UpdatePassword) =>
      new Request(endpoints.users.password.update, {
        body: getJsonBody({
          currentPassword,
          newPassword,
          confirmPassword,
        }),
        locale,
      }).patch(),
    forgotPassword: ({ email }: ForgotPassword) =>
      new Request(endpoints.users.password.forgot, {
        body: getJsonBody({
          email,
        }),
        locale,
      }).post(),
    resetPassword: ({ userId, token, password }: ResetPassword) =>
      new Request(endpoints.users.password.reset, {
        body: getJsonBody({
          userId,
          token,
          password,
        }),
        locale,
      }).post(),
  },
}));
