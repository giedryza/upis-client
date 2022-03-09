import { useQuery } from 'react-query';
import { useSession } from 'next-auth/react';

import { companiesKeys } from 'domain/companies/companies.keys';
import { adapters } from 'domain/companies/companies.adapters';
import { CompaniesFilters } from 'domain/companies/companies.types';

export const useCompanies = (filters: CompaniesFilters = {}) => {
  const query = useQuery(
    companiesKeys.list(filters),
    () => adapters.getCompanies({ params: filters }),
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
    () => adapters.getCompanies({ params }),
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
    () => adapters.getCompany({ slug }),
    {
      select: ({ data }) => data,
      enabled: !!slug,
    }
  );

  return query;
};
