import { useMutation, useQueryClient } from '@tanstack/react-query';

import { socialLinksKeys } from './social-links.keys';
import { useLoaders } from './social-links.loaders';

export const useAddSocialLink = () => {
  const queryClient = useQueryClient();
  const { loaders } = useLoaders();

  const mutation = useMutation({
    mutationFn: loaders.addSocialLink,
    onSuccess: () => {
      queryClient.invalidateQueries(socialLinksKeys.lists);
    },
  });

  return mutation;
};

export const useUpdateSocialLink = () => {
  const queryClient = useQueryClient();
  const { loaders } = useLoaders();

  const mutation = useMutation({
    mutationFn: loaders.updateSocialLink,
    onSuccess: () => {
      queryClient.invalidateQueries(socialLinksKeys.lists);
    },
  });

  return mutation;
};

export const useDeleteSocialLink = () => {
  const queryClient = useQueryClient();
  const { loaders } = useLoaders();

  const mutation = useMutation({
    mutationFn: loaders.deleteSocialLink,
    onSuccess: () => {
      queryClient.invalidateQueries(socialLinksKeys.lists);
    },
  });

  return mutation;
};
