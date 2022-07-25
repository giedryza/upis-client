import { useMutation, useQueryClient } from 'react-query';

import { toursKeys } from './tours.keys';
import { loaders } from './tours.loaders';

export const useCreateTour = () => {
  const mutation = useMutation(loaders.createTour);

  return mutation;
};

export const useUpdateTour = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation(loaders.updateTour, {
    onSuccess: () => {
      queryClient.invalidateQueries(toursKeys.details);
    },
  });

  return mutation;
};

export const useUpdateTourPrice = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation(loaders.updateTourPrice, {
    onSuccess: () => {
      queryClient.invalidateQueries(toursKeys.details);
    },
  });

  return mutation;
};

export const useDeleteTour = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation(loaders.deleteTour, {
    onSuccess: () => {
      queryClient.invalidateQueries(toursKeys.lists);
    },
  });

  return mutation;
};
