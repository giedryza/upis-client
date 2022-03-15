import { useMutation, useQueryClient } from 'react-query';

import { adapters } from 'domain/companies/companies.adapters';
import { companiesKeys } from 'domain/companies/companies.keys';

export const useUpdateCompany = ({
  onSuccess,
}: { onSuccess?: () => void } = {}) => {
  const queryClient = useQueryClient();

  const mutation = useMutation(adapters.updateCompany, {
    onSuccess: () => {
      onSuccess?.();
      queryClient.invalidateQueries(companiesKeys.details());
    },
  });

  return mutation;
};

export const useCreateCompany = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation(adapters.createCompany, {
    onSuccess: () => {
      queryClient.invalidateQueries(companiesKeys.details());
    },
  });

  return mutation;
};

export const useUpdateLocation = ({
  onSuccess,
}: { onSuccess?: () => void } = {}) => {
  const queryClient = useQueryClient();

  const mutation = useMutation(adapters.updateLocation, {
    onSuccess: () => {
      onSuccess?.();
      queryClient.invalidateQueries(companiesKeys.details());
    },
  });

  return mutation;
};

export const useAddSocialLink = ({
  onSuccess,
}: { onSuccess?: () => void } = {}) => {
  const queryClient = useQueryClient();

  const mutation = useMutation(adapters.addSocialLink, {
    onSuccess: () => {
      onSuccess?.();
      queryClient.invalidateQueries(companiesKeys.details());
    },
  });

  return mutation;
};

export const useUpdateSocialLink = ({
  onSuccess,
}: { onSuccess?: () => void } = {}) => {
  const queryClient = useQueryClient();

  const mutation = useMutation(adapters.updateSocialLink, {
    onSuccess: () => {
      onSuccess?.();
      queryClient.invalidateQueries(companiesKeys.details());
    },
  });

  return mutation;
};

export const useDeleteSocialLink = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation(adapters.deleteSocialLink, {
    onSuccess: () => {
      queryClient.invalidateQueries(companiesKeys.details());
    },
  });

  return mutation;
};
