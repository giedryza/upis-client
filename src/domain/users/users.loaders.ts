import { signIn } from 'next-auth/react';
import getT from 'next-translate/getT';

import { endpoints } from 'config';
import {
  generateUrl,
  Request,
  getJsonBody,
  loadersFactory,
} from 'tools/services';

import { Session } from './users.types';

interface Signin {
  email: string;
  password: string;
}

interface SigninWithCredentials {
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
    signinWithCredentials: async ({
      email,
      password,
    }: SigninWithCredentials) => {
      const response = await signIn<'credentials'>('credentials', {
        redirect: false,
        email,
        password,
      });

      if (response?.error) {
        const t = await getT(locale, 'auth');

        throw new Error(t('auth:errors.invalid-credentials'));
      }
    },
    signup: ({ email, password, confirmPassword }: Signup) =>
      new Request<Session>(generateUrl(endpoints.users.signup), {
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
      new Request(generateUrl(endpoints.users.password.update), {
        body: getJsonBody({
          currentPassword,
          newPassword,
          confirmPassword,
        }),
        locale,
      }).patch(),
    forgotPassword: ({ email }: ForgotPassword) =>
      new Request(generateUrl(endpoints.users.password.forgot), {
        body: getJsonBody({
          email,
        }),
        locale,
      }).post(),
    resetPassword: ({ userId, token, password }: ResetPassword) =>
      new Request(generateUrl(endpoints.users.password.reset), {
        body: getJsonBody({
          userId,
          token,
          password,
        }),
        locale,
      }).post(),
  },
}));
