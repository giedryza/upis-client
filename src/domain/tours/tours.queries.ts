import { useSession } from 'next-auth/react';
import { useQuery } from 'react-query';

import { toursKeys } from './tours.keys';
import { ToursFilters } from './tours.types';
import { loaders } from './tours.loaders';
import { converters } from './tours.converters';

interface UseTours {
  filters?: ToursFilters;
  enabled?: boolean;
}

export const useTours = ({ filters = {}, enabled = true }: UseTours) => {
  const query = useQuery(
    toursKeys.list(filters),
    () => loaders.getTours({ params: filters }),
    {
      select: converters.getTours,
      enabled,
    }
  );

  return query;
};

export const useMyTours = (filters: ToursFilters = {}) => {
  const { data: session } = useSession();

  const query = useTours({
    filters: { ...filters, user: session?.user.id },
    enabled: !!session?.user.id,
  });

  return query;
};
