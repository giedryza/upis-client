import { endpoints } from 'config/endpoints';
import { Request, getJsonBody } from 'tools/services/request';

import { Tour } from './tours.types';

export const loaders = {
  createTour: ({ form }: { form: Pick<Tour, 'name' | 'company'> }) =>
    new Request<Tour>(endpoints.tours.index, {
      body: getJsonBody(form),
    }).post(),
};
