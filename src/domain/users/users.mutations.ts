import { useMutation } from 'react-query';
import { signIn } from 'next-auth/react';

import { loaders } from './users.loaders';

export const useSignup = () => {
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
  const mutation = useMutation(loaders.updatePassword);

  return mutation;
};

export const useForgotPassword = () => {
  const mutation = useMutation(loaders.forgotPassword);

  return mutation;
};

export const useResetPassword = () => {
  const mutation = useMutation(loaders.resetPassword);

  return mutation;
};
