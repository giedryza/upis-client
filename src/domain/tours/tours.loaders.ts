import { IncomingMessage } from 'http';

import { endpoints } from 'config/endpoints';
import { Request, getJsonBody, loadersFactory } from 'tools/services/request';
import { Pagination, Price } from 'types/common';

import { Region, River, Tour, ToursFilters } from './tours.types';

interface GetTours {
  req?: IncomingMessage;
  params?: ToursFilters;
}

interface CreateTour {
  form: Pick<Tour, 'name'> & { company: string };
}

interface UpdateTour {
  id: string;
  form: Partial<
    Pick<
      Tour,
      | 'name'
      | 'description'
      | 'website'
      | 'distance'
      | 'duration'
      | 'days'
      | 'difficulty'
    > & {
      arrival: [number, number];
      departure: [number, number];
    }
  >;
}

interface UpdateTourPrice {
  id: string;
  form: Price;
}

interface UpdateTourGeography {
  id: string;
  form: {
    regions: Region[];
    rivers: River[];
  };
}

interface UpdateTourAmenities {
  id: string;
  form: {
    amenities: string[];
  };
}

interface DeleteTour {
  id: string;
}

export const { getLoaders, useLoaders } = loadersFactory((locale) => ({
  loaders: {
    getTours: ({ req, params }: GetTours = {}) =>
      new Request<Tour[], Pagination>(endpoints.tours.index, {
        req,
        params,
        locale,
      }).get(),
    getTour: ({ req, id }: { req?: IncomingMessage; id: string }) =>
      new Request<Tour | null>(endpoints.tours.one.index.replace(':id', id), {
        req,
        locale,
      }).get(),
    createTour: ({ form }: CreateTour) =>
      new Request<Tour>(endpoints.tours.index, {
        body: getJsonBody(form),
        locale,
      }).post(),
    updateTour: ({ id, form }: UpdateTour) =>
      new Request<Tour>(endpoints.tours.one.index.replace(':id', id), {
        body: getJsonBody(form, [NaN, null, undefined]),
        locale,
      }).patch(),
    updateTourPrice: ({ id, form }: UpdateTourPrice) =>
      new Request<Tour>(endpoints.tours.one.price.replace(':id', id), {
        body: getJsonBody(form),
        locale,
      }).patch(),
    updateTourGeography: ({ id, form }: UpdateTourGeography) =>
      new Request<Tour>(endpoints.tours.one.geography.replace(':id', id), {
        body: getJsonBody(form),
        locale,
      }).patch(),
    updateTourAmenities: ({ id, form }: UpdateTourAmenities) =>
      new Request<Tour>(endpoints.tours.one.amenities.replace(':id', id), {
        body: getJsonBody(form),
        locale,
      }).patch(),
    deleteTour: ({ id }: DeleteTour) =>
      new Request(endpoints.tours.one.index.replace(':id', id), {
        locale,
      }).delete(),
  },
}));
