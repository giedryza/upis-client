import { useMutation, useQueryClient } from 'react-query';

import { toursKeys } from './tours.keys';
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

export const useUpdateTour = ({ onSuccess }: Options = {}) => {
  const queryClient = useQueryClient();

  const mutation = useMutation(loaders.updateTour, {
    onSuccess: () => {
      onSuccess?.();
      queryClient.invalidateQueries(toursKeys.details());
    },
  });

  return mutation;
};

export const useDeleteTour = ({ onSuccess }: Options = {}) => {
  const queryClient = useQueryClient();

  const mutation = useMutation(loaders.deleteTour, {
    onSuccess: () => {
      onSuccess?.();
      queryClient.invalidateQueries(toursKeys.lists());
    },
  });

  return mutation;
};
