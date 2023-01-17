import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

import { getRouteParam } from 'tools/common';

import { providersKeys } from './providers.keys';
import { useLoaders } from './providers.loaders';
import { converters } from './providers.converters';
import { ProvidersFilters } from './providers.types';

interface UseProviders {
  filters?: ProvidersFilters;
  enabled?: boolean;
}

export const useProviders = ({
  filters = {},
  enabled = true,
}: UseProviders) => {
  const { loaders } = useLoaders();

  const query = useQuery(
    providersKeys.list(filters),
    () => loaders.getProviders({ params: filters }),
    {
      select: converters.getProviders,
      enabled,
    }
  );

  return query;
};

export const useMyProviders = (filters: ProvidersFilters = {}) => {
  const { data: session } = useSession();

  const query = useProviders({
    filters: { ...filters, user: session?.user.id },
    enabled: !!session?.user.id,
  });

  return query;
};

export const useProvider = (id: string) => {
  const { loaders } = useLoaders();

  const query = useQuery(
    providersKeys.detail(id),
    () => loaders.getProvider({ id }),
    {
      enabled: !!id,
      select: converters.getProvider,
    }
  );

  return query;
};

export const useActiveProvider = () => {
  const { query: params } = useRouter();
  const id = getRouteParam(params?.id);

  const query = useProvider(id);

  return query;
};
