import { useMutation, useQueryClient } from '@tanstack/react-query';

import { toursKeys } from './tours.keys';
import { useLoaders } from './tours.loaders';

export const useCreateTour = () => {
  const { loaders } = useLoaders();

  const mutation = useMutation({ mutationFn: loaders.createTour });

  return mutation;
};

export const useUpdateTour = () => {
  const queryClient = useQueryClient();
  const { loaders } = useLoaders();

  const mutation = useMutation({
    mutationFn: loaders.updateTour,
    onSuccess: (_data, { id }) => {
      queryClient.invalidateQueries(toursKeys.detail(id));
    },
  });

  return mutation;
};

export const useUpdateTourPrice = () => {
  const queryClient = useQueryClient();
  const { loaders } = useLoaders();

  const mutation = useMutation({
    mutationFn: loaders.updateTourPrice,
    onSuccess: (_data, { id }) => {
      queryClient.invalidateQueries(toursKeys.detail(id));
    },
  });

  return mutation;
};

export const useUpdateTourGeography = () => {
  const queryClient = useQueryClient();
  const { loaders } = useLoaders();

  const mutation = useMutation({
    mutationFn: loaders.updateTourGeography,
    onSuccess: (_data, { id }) => {
      queryClient.invalidateQueries(toursKeys.detail(id));
    },
  });

  return mutation;
};

export const useUpdateTourAmenities = () => {
  const queryClient = useQueryClient();
  const { loaders } = useLoaders();

  const mutation = useMutation({
    mutationFn: loaders.updateTourAmenities,
    onSuccess: (_data, { id }) => {
      queryClient.invalidateQueries(toursKeys.detail(id));
    },
  });

  return mutation;
};

export const useAddTourPhoto = () => {
  const queryClient = useQueryClient();
  const { loaders } = useLoaders();

  const mutation = useMutation({
    mutationFn: loaders.addTourPhoto,
    onSuccess: (_data, { id }) => {
      queryClient.invalidateQueries(toursKeys.detail(id));
    },
  });

  return mutation;
};

export const useDeleteTour = () => {
  const queryClient = useQueryClient();
  const { loaders } = useLoaders();

  const mutation = useMutation({
    mutationFn: loaders.deleteTour,
    onSuccess: () => {
      queryClient.invalidateQueries(toursKeys.lists);
    },
  });

  return mutation;
};
