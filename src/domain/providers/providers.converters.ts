import { Converter } from 'types/common';

import { getLoaders } from './providers.loaders';

export const converters = {
  getProviders: ({
    data,
    meta,
  }: Converter<typeof getLoaders, 'getProviders'>) => {
    return {
      items: data,
      meta,
    };
  },
  getProvider: ({ data }: Converter<typeof getLoaders, 'getProvider'>) => {
    return data;
  },
};
