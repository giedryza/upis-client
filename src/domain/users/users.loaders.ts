import { signIn } from 'next-auth/react';
import getT from 'next-translate/getT';

import { endpoints } from 'config';
import { generateUrl, getJsonBody, loadersFactory, api } from 'tools/services';

import { Session, User } from './users.types';

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
  user: string;
  token: string;
  password: string;
}

export const { getLoaders, useLoaders } = loadersFactory((locale) => ({
  loaders: {
    signin: ({ email, password }: Signin) =>
      api('post')<Session>(endpoints.users.signin, {
        body: getJsonBody({ email, password }),
        locale,
      }),
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
      api('post')<Session>(generateUrl(endpoints.users.signup), {
        body: getJsonBody({
          email,
          password,
          confirmPassword,
        }),
        locale,
      }),
    updatePassword: ({
      currentPassword,
      newPassword,
      confirmPassword,
    }: UpdatePassword) =>
      api('patch')(generateUrl(endpoints.users.password.update), {
        body: getJsonBody({
          currentPassword,
          newPassword,
          confirmPassword,
        }),
        locale,
        auth: true,
      }),
    forgotPassword: ({ email }: ForgotPassword) =>
      api('post')(generateUrl(endpoints.users.password.forgot), {
        body: getJsonBody({
          email,
        }),
        locale,
      }),
    resetPassword: ({ user, token, password }: ResetPassword) =>
      api('post')(generateUrl(endpoints.users.password.reset), {
        body: getJsonBody({
          user,
          token,
          password,
        }),
        locale,
      }),
    updateRole: () =>
      api('patch')<{ user: User; token: string }>(
        generateUrl(endpoints.users.role),
        {
          locale,
          auth: true,
        }
      ),
  },
}));
