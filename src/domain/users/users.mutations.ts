import { useMutation } from '@tanstack/react-query';
import { signIn } from 'next-auth/react';
import useTranslation from 'next-translate/useTranslation';

import { useAppDispatch } from 'tools/services';
import { alerts } from 'domain/alerts';

import { useLoaders } from './users.loaders';

export const useSigninWithCredentials = () => {
  const { loaders } = useLoaders();

  const mutation = useMutation({ mutationFn: loaders.signinWithCredentials });

  return mutation;
};

export const useSigninWithToken = () => {
  const { loaders } = useLoaders();

  const mutation = useMutation({ mutationFn: loaders.signinWithToken });

  return mutation;
};

export const useSignup = () => {
  const { loaders } = useLoaders();

  const mutation = useMutation({
    mutationFn: loaders.signup,
    onSuccess: (_data, { email, password }) => {
      signIn<'credentials'>('credentials', {
        redirect: false,
        email,
        password,
      });
    },
  });

  return mutation;
};

export const useUpdatePassword = () => {
  const { loaders } = useLoaders();

  const mutation = useMutation({ mutationFn: loaders.updatePassword });

  return mutation;
};

export const useForgotPassword = () => {
  const { loaders } = useLoaders();

  const mutation = useMutation({ mutationFn: loaders.forgotPassword });

  return mutation;
};

export const useResetPassword = () => {
  const { loaders } = useLoaders();

  const mutation = useMutation({ mutationFn: loaders.resetPassword });

  return mutation;
};

export const useUpdateRole = () => {
  const { loaders } = useLoaders();

  const mutation = useMutation({ mutationFn: loaders.updateRole });

  return mutation;
};

export const useVerifyEmail = () => {
  const { loaders } = useLoaders();
  const { mutate: signinWithToken } = useSigninWithToken();

  const mutation = useMutation({
    mutationFn: loaders.verifyEmail,
    onSuccess: ({ data }) => signinWithToken({ token: data.token }),
  });

  return mutation;
};

export const useSendVerifyEmail = () => {
  const { loaders } = useLoaders();
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const mutation = useMutation({
    mutationFn: loaders.sendVerifyEmail,
    onSuccess: () => {
      dispatch(
        alerts.actions.open({
          type: 'success',
          message: t('account:profile.verify_email.success'),
        })
      );
    },
  });

  return mutation;
};
