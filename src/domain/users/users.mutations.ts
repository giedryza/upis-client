import { useMutation } from 'react-query';
import { useRouter } from 'next/router';

import { routes } from 'config/routes';

import { adapters } from './users.adapters';

export const useUpdatePassword = () => {
  const { push } = useRouter();

  const mutation = useMutation(adapters.updatePassword, {
    onSuccess: () => {
      push(routes.account.profile.index);
    },
  });

  return mutation;
};
