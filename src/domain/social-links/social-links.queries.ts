import { useQuery } from 'react-query';

import { socialLinksKeys } from './social-links.keys';
import { adapters } from './social-links.adapters';

export const useSocialLink = (id: string) => {
  const query = useQuery(
    socialLinksKeys.detail(id),
    () => adapters.getSocialLink({ id }),
    {
      select: ({ data }) => data,
      enabled: !!id,
    }
  );

  return query;
};
