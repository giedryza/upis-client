import { useMutation } from '@tanstack/react-query';
import { signIn, useSession } from 'next-auth/react';

import { useLoaders } from './users.loaders';

export const useSigninWithCredentials = () => {
  const { loaders } = useLoaders();

  const mutation = useMutation({ mutationFn: loaders.signinWithCredentials });

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
  const { update } = useSession();

  const mutation = useMutation({
    mutationFn: loaders.verifyEmail,
    onSuccess: ({ data }) =>
      update({
        user: data.user,
        token: data.token,
      }),
  });

  return mutation;
};
