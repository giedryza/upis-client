import { Converter } from 'types/common';

import { getLoaders } from './companies.loaders';

export const converters = {
  getCompanies: ({ data }: Converter<typeof getLoaders, 'getCompanies'>) => {
    return data;
  },
  getCompany: ({ data }: Converter<typeof getLoaders, 'getCompany'>) => {
    return data;
  },
};
