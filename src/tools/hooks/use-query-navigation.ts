import { useRouter } from 'next/router';

import { TourFilters } from 'domain/tours';

interface Params extends TourFilters {}

export const useQueryNavigation = () => {
  const { push, query } = useRouter();

  const emptyValues: any[] = [NaN];

  const navigateWithQuery = (params: Partial<Params> = {}) => {
    const parsed = Object.entries(params).map(([key, value]) => [
      key,
      emptyValues.includes(value) ? [] : value,
    ]);

    push({ query: { ...query, ...Object.fromEntries(parsed) } }, undefined, {
      shallow: true,
    });
  };

  return {
    navigateWithQuery,
  };
};
