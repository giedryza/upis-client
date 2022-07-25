import { useMutation, useQueryClient } from 'react-query';

import { loaders } from './companies.loaders';
import { companiesKeys } from './companies.keys';

export const useUpdateCompany = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation(loaders.updateCompany, {
    onSuccess: () => {
      queryClient.invalidateQueries(companiesKeys.details);
    },
  });

  return mutation;
};

export const useCreateCompany = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation(loaders.createCompany, {
    onSuccess: () => {
      queryClient.invalidateQueries(companiesKeys.details);
    },
  });

  return mutation;
};

export const useUpdateLocation = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation(loaders.updateLocation, {
    onSuccess: () => {
      queryClient.invalidateQueries(companiesKeys.details);
    },
  });

  return mutation;
};

export const useUploadLogo = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation(loaders.uploadLogo, {
    onSuccess: () => {
      queryClient.invalidateQueries(companiesKeys.details);
    },
  });

  return mutation;
};

export const useDeleteCompany = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation(loaders.deleteCompany, {
    onSuccess: () => {
      queryClient.invalidateQueries(companiesKeys.lists);
    },
  });

  return mutation;
};
