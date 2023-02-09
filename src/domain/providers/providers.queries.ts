import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

import { getRouteParam } from 'tools/common';

import { providersKeys } from './providers.keys';
import { useLoaders } from './providers.loaders';
import { converters } from './providers.converters';
import { ProvidersFilters } from './providers.types';

interface UseProviders {
  filters?: Partial<ProvidersFilters>;
  enabled?: boolean;
}

export const useProvidersActiveFilters = () => {
  const { loaders } = useLoaders();
  const { query: params } = useRouter();

  const query = useQuery({
    queryKey: providersKeys.list('filters', 'active', params),
    queryFn: () => loaders.getActiveFilters({ params }),
    select: converters.getActiveFilters,
    keepPreviousData: true,
    refetchOnWindowFocus: false,
  });

  return query;
};

export const useProviders = ({
  filters = {},
  enabled = true,
}: UseProviders) => {
  const { loaders } = useLoaders();

  const query = useQuery({
    queryKey: providersKeys.list(filters),
    queryFn: () => loaders.getProviders({ params: filters }),
    select: converters.getProviders,
    enabled,
    keepPreviousData: true,
  });

  return query;
};

export const useMyProviders = (filters: Partial<ProvidersFilters> = {}) => {
  const { data: session } = useSession();
  const { data: activeFilters } = useProvidersActiveFilters();

  const query = useProviders({
    filters: { ...activeFilters, ...filters, user: session?.user.id },
    enabled: !!session?.user.id,
  });

  return query;
};

export const useProvider = (id: string) => {
  const { loaders } = useLoaders();

  const query = useQuery({
    queryKey: providersKeys.detail(id),
    queryFn: () => loaders.getProvider({ id }),
    select: converters.getProvider,
    enabled: !!id,
  });

  return query;
};

export const useActiveProvider = () => {
  const { query: params } = useRouter();
  const id = getRouteParam(params?.id);

  const query = useProvider(id);

  return query;
};
