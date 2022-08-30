import { loaders } from './amenities.loaders';

export const converters = {
  getAmenity: ({ data }: Awaited<ReturnType<typeof loaders.getAmenity>>) => {
    return data;
  },
};
