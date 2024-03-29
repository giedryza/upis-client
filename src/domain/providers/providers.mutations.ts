import { useMutation, useQueryClient } from '@tanstack/react-query';

import { useLoaders } from './providers.loaders';
import { providersKeys } from './providers.keys';

export const useUpdateProvider = () => {
  const queryClient = useQueryClient();
  const { loaders } = useLoaders();

  const mutation = useMutation({
    mutationFn: loaders.updateProvider,
    onSuccess: () => {
      queryClient.invalidateQueries(providersKeys.details);
    },
  });

  return mutation;
};

export const useCreateProvider = () => {
  const queryClient = useQueryClient();
  const { loaders } = useLoaders();

  const mutation = useMutation({
    mutationFn: loaders.createProvider,
    onSuccess: () => {
      queryClient.invalidateQueries(providersKeys.details);
    },
  });

  return mutation;
};

export const useUpdateLocation = () => {
  const queryClient = useQueryClient();
  const { loaders } = useLoaders();

  const mutation = useMutation({
    mutationFn: loaders.updateLocation,
    onSuccess: () => {
      queryClient.invalidateQueries(providersKeys.details);
    },
  });

  return mutation;
};

export const useUploadLogo = () => {
  const queryClient = useQueryClient();
  const { loaders } = useLoaders();

  const mutation = useMutation({
    mutationFn: loaders.uploadLogo,
    onSuccess: () => {
      queryClient.invalidateQueries(providersKeys.details);
    },
  });

  return mutation;
};

export const useAddSocialLink = () => {
  const queryClient = useQueryClient();
  const { loaders } = useLoaders();

  const mutation = useMutation({
    mutationFn: loaders.addSocialLink,
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries(providersKeys.detail(id));
    },
  });

  return mutation;
};

export const useUpdateSocialLink = () => {
  const queryClient = useQueryClient();
  const { loaders } = useLoaders();

  const mutation = useMutation({
    mutationFn: loaders.updateSocialLink,
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries(providersKeys.detail(id));
    },
  });

  return mutation;
};

export const useDeleteSocialLink = () => {
  const queryClient = useQueryClient();
  const { loaders } = useLoaders();

  const mutation = useMutation({
    mutationFn: loaders.deleteSocialLink,
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries(providersKeys.detail(id));
    },
  });

  return mutation;
};

export const useDeleteProvider = () => {
  const queryClient = useQueryClient();
  const { loaders } = useLoaders();

  const mutation = useMutation({
    mutationFn: loaders.deleteProvider,
    onSuccess: () => {
      queryClient.invalidateQueries(providersKeys.lists);
    },
  });

  return mutation;
};
