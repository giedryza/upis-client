import { Converter } from 'types/common';
import { Tour } from 'domain/tours/tours.types';

import { getLoaders } from './tours.loaders';

const convertTour = (tour: Tour): Tour => {
  return {
    ...tour,
    departure: {
      ...tour.departure,
      coordinates: tour.departure.coordinates ?? [],
    },
    duration: tour.days > 1 ? null : tour.duration,
    photos: tour.primaryPhoto
      ? [...tour.photos].sort(
          (a, b) =>
            Number(b._id === tour.primaryPhoto) -
            Number(a._id === tour.primaryPhoto)
        )
      : tour.photos,
  };
};

export const converters = {
  getTours: ({ data, meta }: Converter<typeof getLoaders, 'getTours'>) => {
    return {
      items: data.map(convertTour),
      meta,
    };
  },
  getTour: ({ data }: Converter<typeof getLoaders, 'getTour'>) => {
    return data ? convertTour(data) : null;
  },
  getFiltersSummary: ({
    data,
  }: Converter<typeof getLoaders, 'getFiltersSummary'>) => {
    return data;
  },
};
