import { useMutation, useQueryClient } from 'react-query';

import { adapters } from 'domain/companies/companies.adapters';
import { companiesKeys } from 'domain/companies/companies.keys';

export const useUpdateCompany = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation(adapters.updateCompany, {
    onSuccess: () => {
      queryClient.invalidateQueries(companiesKeys.detail('me'));
    },
  });

  return mutation;
};

export const useCreateCompany = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation(adapters.createCompany, {
    onSuccess: () => {
      queryClient.invalidateQueries(companiesKeys.detail('me'));
    },
  });

  return mutation;
};

export const useUpdateLocation = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation(adapters.updateLocation, {
    onSuccess: () => {
      queryClient.invalidateQueries(companiesKeys.detail('me'));
    },
  });

  return mutation;
};

export const useAddSocialLink = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation(adapters.addSocialLink, {
    onSuccess: () => {
      queryClient.invalidateQueries(companiesKeys.detail('me'));
    },
  });

  return mutation;
};

export const useUpdateSocialLink = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation(adapters.updateSocialLink, {
    onSuccess: () => {
      queryClient.invalidateQueries(companiesKeys.detail('me'));
    },
  });

  return mutation;
};

export const useDeleteSocialLink = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation(adapters.deleteSocialLink, {
    onSuccess: () => {
      queryClient.invalidateQueries(companiesKeys.detail('me'));
    },
  });

  return mutation;
};
