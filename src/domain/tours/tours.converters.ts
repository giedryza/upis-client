import { loaders } from './tours.loaders';

export const converters = {
  getTours: ({ data }: Awaited<ReturnType<typeof loaders.getTours>>) => {
    return data;
  },
  getTour: ({ data }: Awaited<ReturnType<typeof loaders.getTour>>) => {
    return data;
  },
};
