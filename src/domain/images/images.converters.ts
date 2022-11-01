import { Converter } from 'types/common';

import { getLoaders } from './images.loaders';

export const converters = {
  getImage: ({ data }: Converter<typeof getLoaders, 'getImage'>) => {
    return data;
  },
};
