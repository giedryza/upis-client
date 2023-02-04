import { useSession } from 'next-auth/react';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';

import { getRouteParam } from 'tools/common';

import { toursKeys } from './tours.keys';
import { TourFilters } from './tours.types';
import { useLoaders } from './tours.loaders';
import { converters } from './tours.converters';

interface UseTours {
  filters?: Partial<TourFilters>;
  enabled?: boolean;
}

export const useTours = ({ filters = {}, enabled = true }: UseTours = {}) => {
  const { loaders } = useLoaders();

  const query = useQuery({
    queryKey: toursKeys.list(filters),
    queryFn: () => loaders.getTours({ params: filters }),
    select: converters.getTours,
    keepPreviousData: true,
    enabled,
  });

  return query;
};

export const useInfiniteTours = (filters: Partial<TourFilters> = {}) => {
  const { loaders } = useLoaders();

  const query = useInfiniteQuery(
    toursKeys.list(filters),
    ({ pageParam }) =>
      loaders.getTours({
        params: {
          ...filters,
          page: pageParam,
        },
      }),
    {
      getNextPageParam: ({ meta }) => {
        if (!meta) return undefined;

        return meta.page < meta.pages ? meta.page + 1 : undefined;
      },
      select: ({ pages, pageParams }) => ({
        pages: pages.map((page) => converters.getTours(page)),
        pageParams,
      }),
      keepPreviousData: true,
    }
  );

  return query;
};

export const useMyTours = (filters: Partial<TourFilters> = {}) => {
  const { data: session } = useSession();

  const query = useTours({
    filters: { ...filters, user: session?.user.id },
    enabled: !!session?.user.id,
  });

  return query;
};

export const useTour = (id: string) => {
  const { loaders } = useLoaders();

  const query = useQuery({
    queryKey: toursKeys.detail(id),
    queryFn: () => loaders.getTour({ id }),
    select: converters.getTour,
    enabled: !!id,
  });

  return query;
};

export const useActiveTour = () => {
  const { query: params } = useRouter();
  const id = getRouteParam(params?.id);

  const query = useTour(id);

  return query;
};

export const useToursActiveFilters = () => {
  const { loaders } = useLoaders();
  const { query: params } = useRouter();

  const query = useQuery({
    queryKey: toursKeys.list('filters', 'active', params),
    queryFn: () => loaders.getActiveFilters({ params }),
    select: converters.getActiveFilters,
    keepPreviousData: true,
    refetchOnWindowFocus: false,
  });

  return query;
};

export const useToursFiltersSummary = () => {
  const { loaders } = useLoaders();

  const query = useQuery({
    queryKey: toursKeys.list('filters', 'summary'),
    queryFn: () => loaders.getFiltersSummary(),
    select: converters.getFiltersSummary,
    refetchOnWindowFocus: false,
  });

  return query;
};
