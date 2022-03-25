import { useMutation, useQueryClient } from 'react-query';

import { socialLinksKeys } from './social-links.keys';
import { adapters } from './social-links.adapters';

interface Options {
  onSuccess?: () => void;
}

export const useAddSocialLink = ({ onSuccess }: Options = {}) => {
  const queryClient = useQueryClient();

  const mutation = useMutation(adapters.addSocialLink, {
    onSuccess: () => {
      onSuccess?.();
      queryClient.invalidateQueries(socialLinksKeys.details());
    },
  });

  return mutation;
};

export const useUpdateSocialLink = ({ onSuccess }: Options = {}) => {
  const queryClient = useQueryClient();

  const mutation = useMutation(adapters.updateSocialLink, {
    onSuccess: () => {
      onSuccess?.();
      queryClient.invalidateQueries(socialLinksKeys.details());
    },
  });

  return mutation;
};

export const useDeleteSocialLink = ({ onSuccess }: Options = {}) => {
  const queryClient = useQueryClient();

  const mutation = useMutation(adapters.deleteSocialLink, {
    onSuccess: () => {
      onSuccess?.();
      queryClient.invalidateQueries(socialLinksKeys.details());
    },
  });

  return mutation;
};
