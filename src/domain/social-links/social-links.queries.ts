import { useQuery } from '@tanstack/react-query';

import { socialLinksKeys } from './social-links.keys';
import { useLoaders } from './social-links.loaders';
import { converters } from './social-links.converters';
import { SocialLinksFilters } from './social-links.types';

export const useSocialLinks = (filters: SocialLinksFilters) => {
  const { loaders } = useLoaders();

  const query = useQuery(
    socialLinksKeys.list(filters),
    () => loaders.getSocialLinks({ params: filters }),
    {
      enabled: !!filters.host,
      select: converters.getSocialLinks,
    }
  );

  return query;
};

export const useSocialLink = (id: string) => {
  const { loaders } = useLoaders();

  const query = useQuery(
    socialLinksKeys.detail(id),
    () => loaders.getSocialLink({ id }),
    {
      enabled: !!id,
      select: converters.getSocialLink,
    }
  );

  return query;
};
