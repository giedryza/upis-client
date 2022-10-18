import { useMutation, useQueryClient } from 'react-query';

import { useLoaders } from './providers.loaders';
import { providersKeys } from './providers.keys';

export const useUpdateProvider = () => {
  const queryClient = useQueryClient();
  const { loaders } = useLoaders();

  const mutation = useMutation(loaders.updateProvider, {
    onSuccess: () => {
      queryClient.invalidateQueries(providersKeys.details);
    },
  });

  return mutation;
};

export const useCreateProvider = () => {
  const queryClient = useQueryClient();
  const { loaders } = useLoaders();

  const mutation = useMutation(loaders.createProvider, {
    onSuccess: () => {
      queryClient.invalidateQueries(providersKeys.details);
    },
  });

  return mutation;
};

export const useUpdateLocation = () => {
  const queryClient = useQueryClient();
  const { loaders } = useLoaders();

  const mutation = useMutation(loaders.updateLocation, {
    onSuccess: () => {
      queryClient.invalidateQueries(providersKeys.details);
    },
  });

  return mutation;
};

export const useUploadLogo = () => {
  const queryClient = useQueryClient();
  const { loaders } = useLoaders();

  const mutation = useMutation(loaders.uploadLogo, {
    onSuccess: () => {
      queryClient.invalidateQueries(providersKeys.details);
    },
  });

  return mutation;
};

export const useDeleteProvider = () => {
  const queryClient = useQueryClient();
  const { loaders } = useLoaders();

  const mutation = useMutation(loaders.deleteProvider, {
    onSuccess: () => {
      queryClient.invalidateQueries(providersKeys.lists);
    },
  });

  return mutation;
};
