import { Converter } from 'types/common';

import { getLoaders } from './amenities.loaders';

export const converters = {
  getAmenity: ({ data }: Converter<typeof getLoaders, 'getAmenity'>) => {
    return data;
  },
};
