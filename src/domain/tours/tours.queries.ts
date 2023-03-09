import { useSession } from 'next-auth/react';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';

import { getParams } from 'tools/services/url';

import { toursKeys } from './tours.keys';
import { ToursFilters } from './tours.types';
import { useLoaders } from './tours.loaders';
import { converters } from './tours.converters';
import { useToursFilters } from './tours.hooks';

interface UseTours {
  filters?: Partial<ToursFilters>;
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

export const useMyTours = (filters: Partial<ToursFilters> = {}) => {
  const { data: session } = useSession();
  const activeFilters = useToursFilters();

  const query = useTours({
    filters: { ...activeFilters, ...filters, user: session?.user.id },
    enabled: !!session?.user.id,
  });

  return query;
};

export const useInfiniteTours = (filters: Partial<ToursFilters> = {}) => {
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
        pages: pages
          .map((page) => converters.getTours(page))
          .map((page) => page.items),
        pageParams,
      }),
      keepPreviousData: true,
      refetchOnWindowFocus: true,
    }
  );

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
  const { id } = getParams('id').parse(params);

  const query = useTour(typeof id === 'string' ? id : '');

  return query;
};

export const useToursFiltersSummary = () => {
  const { loaders } = useLoaders();

  const query = useQuery({
    queryKey: toursKeys.list('filters', 'summary'),
    queryFn: () => loaders.getFiltersSummary(),
    select: converters.getFiltersSummary,
  });

  return query;
};
