import { useQuery } from 'react-query';
import { useSession } from 'next-auth/react';

import { companiesKeys } from 'domain/companies/companies.keys';
import { adapters } from 'domain/companies/companies.adapters';

export const useMyCompany = () => {
  const { status } = useSession();

  const query = useQuery(companiesKeys.detail('me'), adapters.getMyCompany, {
    enabled: status === 'authenticated',
    select: ({ data }) => data,
  });

  return query;
};
