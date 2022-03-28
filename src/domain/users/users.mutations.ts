import { useMutation } from 'react-query';
import { signIn } from 'next-auth/react';

import { adapters } from './users.adapters';

interface Options {
  onSuccess?: () => void;
}

export const useSignup = ({ onSuccess }: Options = {}) => {
  const mutation = useMutation(adapters.signup, {
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
  const mutation = useMutation(adapters.updatePassword, {
    onSuccess: () => {
      onSuccess?.();
    },
  });

  return mutation;
};
