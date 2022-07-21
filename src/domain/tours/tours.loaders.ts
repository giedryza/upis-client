import { IncomingMessage } from 'http';

import { endpoints } from 'config/endpoints';
import { Request, getJsonBody } from 'tools/services/request';
import { Pagination, Price } from 'types/common';

import { Tour, ToursFilters } from './tours.types';

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
    >
  >;
}

interface UpdateTourPrice {
  id: string;
  form: Price;
}

interface DeleteTour {
  id: string;
}

export const loaders = {
  getTours: ({ req, params }: GetTours = {}) =>
    new Request<Tour[], Pagination>(endpoints.tours.index, {
      req,
      params,
    }).get(),
  getTour: ({ req, id }: { req?: IncomingMessage; id: string }) =>
    new Request<Tour | null>(endpoints.tours.one.index.replace(':id', id), {
      req,
    }).get(),
  createTour: ({ form }: CreateTour) =>
    new Request<Tour>(endpoints.tours.index, {
      body: getJsonBody(form),
    }).post(),
  updateTour: ({ id, form }: UpdateTour) =>
    new Request<Tour>(endpoints.tours.one.index.replace(':id', id), {
      body: getJsonBody(form, [NaN, null, undefined]),
    }).patch(),
  updateTourPrice: ({ id, form }: UpdateTourPrice) =>
    new Request<Tour>(endpoints.tours.one.price.replace(':id', id), {
      body: getJsonBody(form),
    }).patch(),
  deleteTour: ({ id }: DeleteTour) =>
    new Request(endpoints.tours.one.index.replace(':id', id)).delete(),
};
