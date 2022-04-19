import { useQuery } from 'react-query';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

import { getRouteParam } from 'tools/common';

import { companiesKeys } from './companies.keys';
import { loaders } from './companies.loaders';
import { CompaniesFilters } from './companies.types';

export const useCompanies = (filters: CompaniesFilters = {}) => {
  const query = useQuery(
    companiesKeys.list(filters),
    () => loaders.getCompanies({ params: filters }),
    {
      select: ({ data }) => data,
    }
  );

  return query;
};

export const useMyCompanies = (filters: CompaniesFilters = {}) => {
  const { data: session } = useSession();

  const params: CompaniesFilters = { ...filters, user: session?.user.id };

  const query = useQuery(
    companiesKeys.list(params),
    () => loaders.getCompanies({ params }),
    {
      enabled: !!session?.user.id,
      select: ({ data }) => data,
    }
  );

  return query;
};

export const useCompany = (slug: string) => {
  const query = useQuery(
    companiesKeys.detail(slug),
    () => loaders.getCompany({ slug }),
    {
      select: ({ data }) => data,
      enabled: !!slug,
    }
  );

  return query;
};

export const useActiveCompany = () => {
  const { query: params } = useRouter();
  const slug = getRouteParam(params?.slug);

  const query = useCompany(slug);

  return query;
};
