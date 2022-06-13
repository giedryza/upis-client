import { IncomingMessage } from 'http';

import { endpoints } from 'config/endpoints';
import { Request, getJsonBody } from 'tools/services/request';
import { Pagination } from 'types/common';

import { Tour, ToursFilters } from './tours.types';

interface GetTours {
  req?: IncomingMessage;
  params?: ToursFilters;
}

interface CreateTour {
  form: Pick<Tour, 'name'> & { company: string };
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
  deleteTour: ({ id }: DeleteTour) =>
    new Request(endpoints.tours.one.index.replace(':id', id)).delete(),
};
