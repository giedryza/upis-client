import { IncomingMessage } from 'http';

import { endpoints } from 'config/endpoints';
import { Request, getJsonBody } from 'tools/services/request';
import { Pagination } from 'types/common';

import { Tour, ToursFilters } from './tours.types';

export const loaders = {
  getTours: ({
    req,
    params,
  }: { req?: IncomingMessage; params?: ToursFilters } = {}) =>
    new Request<Tour[], Pagination>(endpoints.tours.index, {
      req,
      params,
    }).get(),
  createTour: ({ form }: { form: Pick<Tour, 'name' | 'company'> }) =>
    new Request<Tour>(endpoints.tours.index, {
      body: getJsonBody(form),
    }).post(),
};
