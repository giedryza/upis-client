import { useMutation, useQueryClient } from 'react-query';

import { adapters } from 'domain/companies/companies.adapters';
import { companiesKeys } from 'domain/companies/companies.keys';

interface Options {
  onSuccess?: () => void;
}

export const useUpdateCompany = ({ onSuccess }: Options = {}) => {
  const queryClient = useQueryClient();

  const mutation = useMutation(adapters.updateCompany, {
    onSuccess: () => {
      onSuccess?.();
      queryClient.invalidateQueries(companiesKeys.details());
    },
  });

  return mutation;
};

export const useCreateCompany = ({ onSuccess }: Options = {}) => {
  const queryClient = useQueryClient();

  const mutation = useMutation(adapters.createCompany, {
    onSuccess: () => {
      onSuccess?.();
      queryClient.invalidateQueries(companiesKeys.details());
    },
  });

  return mutation;
};

export const useUpdateLocation = ({ onSuccess }: Options = {}) => {
  const queryClient = useQueryClient();

  const mutation = useMutation(adapters.updateLocation, {
    onSuccess: () => {
      onSuccess?.();
      queryClient.invalidateQueries(companiesKeys.details());
    },
  });

  return mutation;
};

export const useDeleteCompany = ({ onSuccess }: Options = {}) => {
  const queryClient = useQueryClient();

  const mutation = useMutation(adapters.deleteCompany, {
    onSuccess: () => {
      onSuccess?.();
      queryClient.invalidateQueries(companiesKeys.lists());
    },
  });

  return mutation;
};

export const useAddSocialLink = ({ onSuccess }: Options = {}) => {
  const queryClient = useQueryClient();

  const mutation = useMutation(adapters.addSocialLink, {
    onSuccess: () => {
      onSuccess?.();
      queryClient.invalidateQueries(companiesKeys.details());
    },
  });

  return mutation;
};

export const useUpdateSocialLink = ({ onSuccess }: Options = {}) => {
  const queryClient = useQueryClient();

  const mutation = useMutation(adapters.updateSocialLink, {
    onSuccess: () => {
      onSuccess?.();
      queryClient.invalidateQueries(companiesKeys.details());
    },
  });

  return mutation;
};

export const useDeleteSocialLink = ({ onSuccess }: Options = {}) => {
  const queryClient = useQueryClient();

  const mutation = useMutation(adapters.deleteSocialLink, {
    onSuccess: () => {
      onSuccess?.();
      queryClient.invalidateQueries(companiesKeys.details());
    },
  });

  return mutation;
};
