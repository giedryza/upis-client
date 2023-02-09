import { IncomingMessage } from 'http';
import { Router } from 'next/router';

import { endpoints } from 'config/endpoints';
import {
  Request,
  getJsonBody,
  loadersFactory,
  getFormDataBody,
  normalizeQueryParams,
} from 'tools/services';
import { Price } from 'types/common';
import { Pagination } from 'types/api';
import { generateUrl } from 'tools/common';

import {
  FiltersSummary,
  Region,
  River,
  Tour,
  toursFilters,
  ToursFilters,
} from './tours.types';

interface GetTours {
  req?: IncomingMessage;
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

interface GetFilters {
  params: Router['query'];
}

interface GetFiltersSummary {
  req?: IncomingMessage;
}

export const { getLoaders, useLoaders } = loadersFactory((locale) => ({
  loaders: {
    getTours: ({ req, params }: GetTours = {}) =>
      new Request<Tour[], Pagination>(generateUrl(endpoints.tours.index), {
        req,
        params: {
          populate: ['photos'],
          limit: 15,
          ...params,
          bounds: [],
        },
        locale,
      }).get(),
    getTour: ({ req, id }: { req?: IncomingMessage; id: string }) =>
      new Request<Tour | null>(generateUrl(endpoints.tours.one.index, { id }), {
        req,
        locale,
      }).get(),
    createTour: ({ form }: CreateTour) =>
      new Request<Tour>(generateUrl(endpoints.tours.index), {
        body: getJsonBody(form),
        locale,
      }).post(),
    updateTour: ({ id, form }: UpdateTour) =>
      new Request<Tour>(generateUrl(endpoints.tours.one.index, { id }), {
        body: getJsonBody(form, [NaN, null, undefined]),
        locale,
      }).patch(),
    updateTourPrice: ({ id, form }: UpdateTourPrice) =>
      new Request<Tour>(generateUrl(endpoints.tours.one.price, { id }), {
        body: getJsonBody(form),
        locale,
      }).patch(),
    updateTourGeography: ({ id, form }: UpdateTourGeography) =>
      new Request<Tour>(generateUrl(endpoints.tours.one.geography, { id }), {
        body: getJsonBody(form),
        locale,
      }).patch(),
    updateTourAmenities: ({ id, form }: UpdateTourAmenities) =>
      new Request<Tour>(generateUrl(endpoints.tours.one.amenities, { id }), {
        body: getJsonBody(form),
        locale,
      }).patch(),
    addTourPhoto: ({ id, form }: AddTourPhoto) =>
      new Request<Tour>(generateUrl(endpoints.tours.one.photo, { id }), {
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
      }).patch(),
    deleteTour: ({ id }: DeleteTour) =>
      new Request(generateUrl(endpoints.tours.one.index, { id }), {
        locale,
      }).delete(),
    getActiveFilters: ({ params }: GetFilters) =>
      toursFilters
        .partial()
        .safeParseAsync(
          normalizeQueryParams(params, [
            'amenities',
            'regions',
            'rivers',
            'select',
            'populate',
          ])
        ),
    getFiltersSummary: ({ req }: GetFiltersSummary = {}) =>
      new Request<FiltersSummary>(generateUrl(endpoints.tours.filters), {
        req,
        locale,
      }).get(),
  },
}));
