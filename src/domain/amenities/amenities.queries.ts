import { useQuery } from 'react-query';

import { amenitiesKeys } from './amenities.keys';
import { loaders } from './amenities.loaders';
import { converters } from './amenities.converters';

export const useAmenity = (id: string) => {
  const query = useQuery(
    amenitiesKeys.detail(id),
    () => loaders.getAmenity({ id }),
    {
      enabled: !!id,
      select: converters.getAmenity,
    }
  );

  return query;
};