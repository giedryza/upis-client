import { useMutation, useQueryClient } from 'react-query';

import { companiesKeys } from 'domain/companies';

import { loaders } from './amenities.loaders';

export const useAddAmenity = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation(loaders.addAmenity, {
    onSuccess: (_, { form }) => {
      queryClient.invalidateQueries(companiesKeys.detail(form.companyId));
    },
  });

  return mutation;
};

export const useUpdateAmenity = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation(loaders.updateAmenity, {
    onSuccess: (_, { companyId }) => {
      queryClient.invalidateQueries(companiesKeys.detail(companyId));
    },
  });

  return mutation;
};

export const useDeleteAmenity = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation(loaders.deleteAmenity, {
    onSuccess: (_, { companyId }) => {
      queryClient.invalidateQueries(companiesKeys.detail(companyId));
    },
  });

  return mutation;
};
