import { useQuery } from '@tanstack/react-query';

import { amenitiesKeys } from './amenities.keys';
import { useLoaders } from './amenities.loaders';
import { converters } from './amenities.converters';

export const useAmenity = (id: string) => {
  const { loaders } = useLoaders();

  const query = useQuery({
    queryKey: amenitiesKeys.detail(id),
    queryFn: () => loaders.getAmenity({ id }),
    enabled: !!id,
    select: converters.getAmenity,
  });

  return query;
};
