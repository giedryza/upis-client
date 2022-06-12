import { useMutation } from 'react-query';

import { loaders } from './tours.loaders';

interface Options {
  onSuccess?: () => void;
}

export const useCreateTour = ({ onSuccess }: Options = {}) => {
  const mutation = useMutation(loaders.createTour, {
    onSuccess: () => {
      onSuccess?.();
    },
  });

  return mutation;
};
