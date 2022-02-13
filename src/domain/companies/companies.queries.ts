import { useQuery } from 'react-query';
import { useSelector } from 'react-redux';

import { companiesKeys } from 'domain/companies/companies.keys';
import { adapters } from 'domain/companies/companies.adapters';
import { getUser } from 'domain/auth/auth.selectors';

export const useMyCompany = () => {
  const user = useSelector(getUser);

  const query = useQuery(companiesKeys.detail('me'), adapters.getMyCompany, {
    enabled: !!user,
    select: ({ data }) => data,
  });

  return query;
};
