import { signIn } from 'next-auth/react';
import getT from 'next-translate/getT';

import { endpoints } from 'config';
import { generateUrl, getJsonBody, loadersFactory, api } from 'tools/services';

import { Session, User } from './users.types';

interface SigninWithCredentials {
  email: string;
  password: string;
}

interface SigninWithToken {
  token: string;
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

interface VerifyEmail {
  user: string;
  token: string;
}

export const { getLoaders, useLoaders } = loadersFactory((locale) => ({
  loaders: {
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

        throw new Error(t('auth:errors.invalid_credentials'));
      }
    },
    signinWithToken: async ({ token }: SigninWithToken) => {
      const response = await signIn<'credentials'>('token', {
        redirect: false,
        token,
      });

      if (response?.error) {
        const t = await getT(locale, 'auth');

        throw new Error(t('auth:errors.invalid_credentials'));
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
    verifyEmail: ({ token, user }: VerifyEmail) =>
      api('patch')<{ user: string; token: string }>(
        generateUrl(endpoints.users.email.verify),
        {
          body: getJsonBody({
            token,
            user,
          }),
          locale,
        }
      ),
    sendVerifyEmail: () =>
      api('post')(generateUrl(endpoints.users.email.sendVerifyEmail), {
        locale,
        auth: true,
      }),
  },
}));
