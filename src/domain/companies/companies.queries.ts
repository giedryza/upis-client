import { useQuery } from 'react-query';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

import { getRouteParam } from 'tools/common';

import { companiesKeys } from './companies.keys';
import { useLoaders } from './companies.loaders';
import { converters } from './companies.converters';
import { CompaniesFilters } from './companies.types';

interface UseCompanies {
  filters?: CompaniesFilters;
  enabled?: boolean;
}

export const useCompanies = ({
  filters = {},
  enabled = true,
}: UseCompanies) => {
  const { loaders } = useLoaders();

  const query = useQuery(
    companiesKeys.list(filters),
    () => loaders.getCompanies({ params: filters }),
    {
      select: converters.getCompanies,
      enabled,
    }
  );

  return query;
};

export const useMyCompanies = (filters: CompaniesFilters = {}) => {
  const { data: session } = useSession();

  const query = useCompanies({
    filters: { ...filters, user: session?.user.id },
    enabled: !!session?.user.id,
  });

  return query;
};

export const useCompany = (id: string) => {
  const { loaders } = useLoaders();

  const query = useQuery(
    companiesKeys.detail(id),
    () => loaders.getCompany({ id }),
    {
      enabled: !!id,
      select: converters.getCompany,
    }
  );

  return query;
};

export const useActiveCompany = () => {
  const { query: params } = useRouter();
  const id = getRouteParam(params?.id);

  const query = useCompany(id);

  return query;
};
