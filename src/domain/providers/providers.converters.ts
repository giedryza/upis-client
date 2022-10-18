import { Converter } from 'types/common';

import { getLoaders } from './providers.loaders';

export const converters = {
  getProviders: ({ data }: Converter<typeof getLoaders, 'getProviders'>) => {
    return data;
  },
  getProvider: ({ data }: Converter<typeof getLoaders, 'getProvider'>) => {
    return data;
  },
};
