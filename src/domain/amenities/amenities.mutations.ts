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
