import { Converter } from 'types/common';

import { getLoaders } from './tours.loaders';

export const converters = {
  getTours: ({ data }: Converter<typeof getLoaders, 'getTours'>) => {
    return data;
  },
  getTour: ({ data }: Converter<typeof getLoaders, 'getTour'>) => {
    return data;
  },
  getFilters: (parsed: Converter<typeof getLoaders, 'getFilters'>) => {
    if (parsed.success) return parsed.data;

    return {};
  },
};
