import { endpoints } from 'config';
import {
  generateUrl,
  getJsonBody,
  loadersFactory,
  getFormDataBody,
  api,
} from 'tools/services';
import { AppRequest, Price } from 'types/common';
import { Pagination } from 'types/api';

import {
  FiltersSummary,
  Region,
  River,
  Tour,
  ToursFilters,
} from './tours.types';

interface GetTours {
  req?: AppRequest;
  params?: Partial<ToursFilters>;
}

interface CreateTour {
  form: Pick<Tour, 'name'> & { provider: string };
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
      | 'primaryPhoto'
    > & {
      arrival: [number, number];
      departure: [number, number];
    }
  >;
}

interface UpdateTours {
  filter: {
    provider: string;
  };
  update: Partial<{
    amenity: string;
  }>;
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

interface AddTourPhoto {
  id: string;
  form: {
    photo: File;
    description: string;
  };
}

interface DeleteTour {
  id: string;
}

interface GetFiltersSummary {
  req?: AppRequest;
}

export const { getLoaders, useLoaders } = loadersFactory((locale) => ({
  loaders: {
    getTours: ({ req, params }: GetTours = {}) =>
      api('get')<Tour[], Pagination>(generateUrl(endpoints.tours.index), {
        req,
        params: {
          populate: ['photos'],
          limit: 30,
          ...params,
        },
        locale,
      }),
    getTour: ({ req, id }: { req?: AppRequest; id: string }) =>
      api('get')<Tour | null>(generateUrl(endpoints.tours.one.index, { id }), {
        req,
        locale,
      }),
    createTour: ({ form }: CreateTour) =>
      api('post')<Tour>(generateUrl(endpoints.tours.index), {
        body: getJsonBody(form),
        locale,
        auth: true,
      }),
    updateTour: ({ id, form }: UpdateTour) =>
      api('patch')<Tour>(generateUrl(endpoints.tours.one.index, { id }), {
        body: getJsonBody(form, [NaN, null, undefined]),
        locale,
        auth: true,
      }),
    updateTours: ({ filter, update }: UpdateTours) =>
      api('patch')<Tour>(generateUrl(endpoints.tours.index), {
        body: getJsonBody({ filter, update }),
        locale,
        auth: true,
      }),
    updateTourPrice: ({ id, form }: UpdateTourPrice) =>
      api('patch')<Tour>(generateUrl(endpoints.tours.one.price, { id }), {
        body: getJsonBody(form),
        locale,
        auth: true,
      }),
    updateTourGeography: ({ id, form }: UpdateTourGeography) =>
      api('patch')<Tour>(generateUrl(endpoints.tours.one.geography, { id }), {
        body: getJsonBody(form),
        locale,
        auth: true,
      }),
    updateTourAmenities: ({ id, form }: UpdateTourAmenities) =>
      api('patch')<Tour>(generateUrl(endpoints.tours.one.amenities, { id }), {
        body: getJsonBody(form),
        locale,
        auth: true,
      }),
    addTourPhoto: ({ id, form }: AddTourPhoto) =>
      api('patch')<Tour>(generateUrl(endpoints.tours.one.photo, { id }), {
        body: getFormDataBody([
          {
            field: 'photo',
            value: form.photo,
          },
          {
            field: 'description',
            value: form.description,
          },
        ]),
        locale,
        auth: true,
      }),
    deleteTour: ({ id }: DeleteTour) =>
      api('delete')(generateUrl(endpoints.tours.one.index, { id }), {
        locale,
        auth: true,
      }),
    getFiltersSummary: ({ req }: GetFiltersSummary = {}) =>
      api('get')<FiltersSummary>(generateUrl(endpoints.tours.filters), {
        req,
        locale,
      }),
  },
}));
