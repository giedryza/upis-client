import { useMutation, useQueryClient } from 'react-query';

import { requests } from 'domain/companies/companies.requests';
import { companiesKeys } from 'domain/companies/companies.keys';

export const useUpdateCompany = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation(requests.updateCompany, {
    onSuccess: () => {
      queryClient.invalidateQueries(companiesKeys.detail('me'));
    },
  });

  return mutation;
};

export const useCreateCompany = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation(requests.createCompany, {
    onSuccess: () => {
      queryClient.invalidateQueries(companiesKeys.detail('me'));
    },
  });

  return mutation;
};

export const useUpdateLocation = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation(requests.updateLocation, {
    onSuccess: () => {
      queryClient.invalidateQueries(companiesKeys.detail('me'));
    },
  });

  return mutation;
};

export const useAddSocialLink = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation(requests.addSocialLink, {
    onSuccess: () => {
      queryClient.invalidateQueries(companiesKeys.detail('me'));
    },
  });

  return mutation;
};

export const useUpdateSocialLink = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation(requests.updateSocialLink, {
    onSuccess: () => {
      queryClient.invalidateQueries(companiesKeys.detail('me'));
    },
  });

  return mutation;
};

export const useDeleteSocialLink = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation(requests.deleteSocialLink, {
    onSuccess: () => {
      queryClient.invalidateQueries(companiesKeys.detail('me'));
    },
  });

  return mutation;
};
