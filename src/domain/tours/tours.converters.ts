import { Converter } from 'types/common';
import { Tour } from 'domain/tours/tours.types';

import { getLoaders } from './tours.loaders';

const convertTour = (tour: Tour): Tour => ({
  ...tour,
  departure: {
    ...tour.departure,
    coordinates: tour.departure.coordinates ?? [],
  },
});

export const converters = {
  getTours: ({ data }: Converter<typeof getLoaders, 'getTours'>) => {
    return data.map(convertTour);
  },
  getTour: ({ data }: Converter<typeof getLoaders, 'getTour'>) => {
    return data ? convertTour(data) : null;
  },
  getActiveFilters: (
    parsed: Converter<typeof getLoaders, 'getActiveFilters'>
  ) => {
    if (parsed.success) return parsed.data;

    return {};
  },
  getFiltersSummary: ({
    data,
  }: Converter<typeof getLoaders, 'getFiltersSummary'>) => {
    return data;
  },
};
