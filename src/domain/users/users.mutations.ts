import { useMutation } from 'react-query';
import { signIn } from 'next-auth/react';

import { loaders } from './users.loaders';

interface Options {
  onSuccess?: () => void;
}

export const useSignup = ({ onSuccess }: Options = {}) => {
  const mutation = useMutation(loaders.signup, {
    onSuccess: (_data, { email, password }) => {
      signIn<'credentials'>('credentials', {
        redirect: false,
        email,
        password,
      });
      onSuccess?.();
    },
  });

  return mutation;
};

export const useUpdatePassword = ({ onSuccess }: Options = {}) => {
  const mutation = useMutation(loaders.updatePassword, {
    onSuccess: () => {
      onSuccess?.();
    },
  });

  return mutation;
};

export const useForgotPassword = ({ onSuccess }: Options = {}) => {
  const mutation = useMutation(loaders.forgotPassword, {
    onSuccess: () => {
      onSuccess?.();
    },
  });

  return mutation;
};
