import { useSession } from 'next-auth/react';
import { useInfiniteQuery, useQuery } from 'react-query';
import { useRouter } from 'next/router';

import { getRouteParam } from 'tools/common';

import { toursKeys } from './tours.keys';
import { ToursFilters } from './tours.types';
import { useLoaders } from './tours.loaders';
import { converters } from './tours.converters';

interface UseTours {
  filters?: Partial<ToursFilters>;
  enabled?: boolean;
}

export const useTours = ({ filters = {}, enabled = true }: UseTours = {}) => {
  const { loaders } = useLoaders();

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

export const useInfiniteTours = (filters: Partial<ToursFilters> = {}) => {
  const { loaders } = useLoaders();

  const query = useInfiniteQuery(
    toursKeys.list(filters),
    ({ pageParam }) =>
      loaders.getTours({ params: { ...filters, page: pageParam } }),
    {
      getNextPageParam: ({ meta }) => {
        if (!meta) return undefined;

        return meta.page < meta.pages ? meta.page + 1 : undefined;
      },
      select: ({ pages, pageParams }) => ({
        pages: pages.map((page) => converters.getTours(page)),
        pageParams,
      }),
    }
  );

  return query;
};

export const useMyTours = (filters: Partial<ToursFilters> = {}) => {
  const { data: session } = useSession();

  const query = useTours({
    filters: { ...filters, user: session?.user.id },
    enabled: !!session?.user.id,
  });

  return query;
};

export const useTour = (id: string) => {
  const { loaders } = useLoaders();

  const query = useQuery(toursKeys.detail(id), () => loaders.getTour({ id }), {
    enabled: !!id,
    select: converters.getTour,
  });

  return query;
};

export const useActiveTour = () => {
  const { query: params } = useRouter();
  const id = getRouteParam(params?.id);

  const query = useTour(id);

  return query;
};

export const useToursFilters = () => {
  const { loaders } = useLoaders();
  const { query: params } = useRouter();

  const query = useQuery(
    toursKeys.list('filters', params),
    () => loaders.getFilters({ params }),
    {
      select: converters.getFilters,
      keepPreviousData: true,
    }
  );

  return query;
};
