import { useMutation } from '@tanstack/react-query';
import { signIn } from 'next-auth/react';

import { useLoaders } from './users.loaders';

export const useSignup = () => {
  const { loaders } = useLoaders();

  const mutation = useMutation(loaders.signup, {
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

  const mutation = useMutation(loaders.updatePassword);

  return mutation;
};

export const useForgotPassword = () => {
  const { loaders } = useLoaders();

  const mutation = useMutation(loaders.forgotPassword);

  return mutation;
};

export const useResetPassword = () => {
  const { loaders } = useLoaders();

  const mutation = useMutation(loaders.resetPassword);

  return mutation;
};
