import { useQuery } from '@tanstack/react-query';

import { socialLinksKeys } from './social-links.keys';
import { useLoaders } from './social-links.loaders';
import { converters } from './social-links.converters';
import { SocialLinksFilters } from './social-links.types';

export const useSocialLinks = (filters: SocialLinksFilters) => {
  const { loaders } = useLoaders();

  const query = useQuery({
    queryKey: socialLinksKeys.list(filters),
    queryFn: () => loaders.getSocialLinks({ params: filters }),
    select: converters.getSocialLinks,
    enabled: !!filters.host,
  });

  return query;
};

export const useSocialLink = (id: string) => {
  const { loaders } = useLoaders();

  const query = useQuery({
    queryKey: socialLinksKeys.detail(id),
    queryFn: () => loaders.getSocialLink({ id }),
    select: converters.getSocialLink,
    enabled: !!id,
  });

  return query;
};
