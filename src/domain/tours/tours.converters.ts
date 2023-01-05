import { Converter } from 'types/common';

import { getLoaders } from './tours.loaders';

export const converters = {
  getTours: ({ data }: Converter<typeof getLoaders, 'getTours'>) => {
    return data;
  },
  getTour: ({ data }: Converter<typeof getLoaders, 'getTour'>) => {
    return data;
  },
  getActiveFilters: (
    parsed: Converter<typeof getLoaders, 'getActiveFilters'>
  ) => {
    if (parsed.success) return parsed.data;

    return {};
  },
  getFiltersSummary: ({
    data,
  }: Converter<typeof getLoaders, 'getFiltersSummary'>) => {
    return data;
  },
};
