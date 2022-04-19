import { useMutation, useQueryClient } from 'react-query';

import { socialLinksKeys } from './social-links.keys';
import { loaders } from './social-links.loaders';

interface Options {
  onSuccess?: () => void;
}

export const useAddSocialLink = ({ onSuccess }: Options = {}) => {
  const queryClient = useQueryClient();

  const mutation = useMutation(loaders.addSocialLink, {
    onSuccess: () => {
      onSuccess?.();
      queryClient.invalidateQueries(socialLinksKeys.lists());
    },
  });

  return mutation;
};

export const useUpdateSocialLink = ({ onSuccess }: Options = {}) => {
  const queryClient = useQueryClient();

  const mutation = useMutation(loaders.updateSocialLink, {
    onSuccess: () => {
      onSuccess?.();
      queryClient.invalidateQueries(socialLinksKeys.lists());
    },
  });

  return mutation;
};

export const useDeleteSocialLink = ({ onSuccess }: Options = {}) => {
  const queryClient = useQueryClient();

  const mutation = useMutation(loaders.deleteSocialLink, {
    onSuccess: () => {
      onSuccess?.();
      queryClient.invalidateQueries(socialLinksKeys.lists());
    },
  });

  return mutation;
};
