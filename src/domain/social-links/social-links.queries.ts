import { useQuery } from 'react-query';

import { socialLinksKeys } from './social-links.keys';
import { adapters } from './social-links.adapters';
import { SocialLinksFilters } from './social-links.types';

export const useSocialLinks = (filters: SocialLinksFilters) => {
  const query = useQuery(
    socialLinksKeys.list(filters),
    () => adapters.getSocialLinks({ params: filters }),
    {
      select: ({ data }) => data,
      enabled: !!filters.host,
    }
  );

  return query;
};

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
