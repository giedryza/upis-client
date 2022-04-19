import { useMutation, useQueryClient } from 'react-query';

import { loaders } from './companies.loaders';
import { companiesKeys } from './companies.keys';

interface Options {
  onSuccess?: () => void;
}

export const useUpdateCompany = ({ onSuccess }: Options = {}) => {
  const queryClient = useQueryClient();

  const mutation = useMutation(loaders.updateCompany, {
    onSuccess: () => {
      onSuccess?.();
      queryClient.invalidateQueries(companiesKeys.details());
    },
  });

  return mutation;
};

export const useCreateCompany = ({ onSuccess }: Options = {}) => {
  const queryClient = useQueryClient();

  const mutation = useMutation(loaders.createCompany, {
    onSuccess: () => {
      onSuccess?.();
      queryClient.invalidateQueries(companiesKeys.details());
    },
  });

  return mutation;
};

export const useUpdateLocation = ({ onSuccess }: Options = {}) => {
  const queryClient = useQueryClient();

  const mutation = useMutation(loaders.updateLocation, {
    onSuccess: () => {
      onSuccess?.();
      queryClient.invalidateQueries(companiesKeys.details());
    },
  });

  return mutation;
};

export const useUploadLogo = ({ onSuccess }: Options = {}) => {
  const queryClient = useQueryClient();

  const mutation = useMutation(loaders.uploadLogo, {
    onSuccess: () => {
      onSuccess?.();
      queryClient.invalidateQueries(companiesKeys.details());
    },
  });

  return mutation;
};

export const useDeleteCompany = ({ onSuccess }: Options = {}) => {
  const queryClient = useQueryClient();

  const mutation = useMutation(loaders.deleteCompany, {
    onSuccess: () => {
      onSuccess?.();
      queryClient.invalidateQueries(companiesKeys.lists());
    },
  });

  return mutation;
};
