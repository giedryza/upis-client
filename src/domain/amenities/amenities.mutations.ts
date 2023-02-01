import { useMutation, useQueryClient } from '@tanstack/react-query';

import { providersKeys } from 'domain/providers';

import { useLoaders } from './amenities.loaders';

export const useAddAmenity = () => {
  const queryClient = useQueryClient();
  const { loaders } = useLoaders();

  const mutation = useMutation({
    mutationFn: loaders.addAmenity,
    onSuccess: (_, { form }) => {
      queryClient.invalidateQueries(providersKeys.detail(form.providerId));
    },
  });

  return mutation;
};

export const useUpdateAmenity = () => {
  const queryClient = useQueryClient();
  const { loaders } = useLoaders();

  const mutation = useMutation({
    mutationFn: loaders.updateAmenity,
    onSuccess: (_, { providerId }) => {
      queryClient.invalidateQueries(providersKeys.detail(providerId));
    },
  });

  return mutation;
};

export const useDeleteAmenity = () => {
  const queryClient = useQueryClient();
  const { loaders } = useLoaders();

  const mutation = useMutation({
    mutationFn: loaders.deleteAmenity,
    onSuccess: (_, { providerId }) => {
      queryClient.invalidateQueries(providersKeys.detail(providerId));
    },
  });

  return mutation;
};
