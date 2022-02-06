import { useQuery } from 'react-query';
import { useSelector } from 'react-redux';

import { companiesKeys } from 'domain/companies/companies.keys';
import { requests } from 'domain/companies/companies.requests';
import { getUser } from 'domain/auth/auth.selectors';

export const useMyCompany = () => {
  const user = useSelector(getUser);

  const query = useQuery(companiesKeys.detail('me'), requests.getMyCompany, {
    enabled: !!user,
    select: ({ data }) => data,
  });

  return query;
};
