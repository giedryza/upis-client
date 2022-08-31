import { Converter } from 'types/common';

import { getLoaders } from './social-links.loaders';

export const converters = {
  getSocialLinks: ({
    data,
  }: Converter<typeof getLoaders, 'getSocialLinks'>) => {
    return data;
  },
  getSocialLink: ({ data }: Converter<typeof getLoaders, 'getSocialLink'>) => {
    return data;
  },
};
