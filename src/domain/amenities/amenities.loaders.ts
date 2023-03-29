import { endpoints } from 'config';
import { generateUrl, getJsonBody, loadersFactory, api } from 'tools/services';
import { AppRequest, Currency } from 'types/common';

import { Amenity } from './amenities.types';

interface AddAmenity {
  form: {
    variant: Amenity['variant'];
    unit: Amenity['unit'];
    amount: number;
    currency: Currency;
    info: string;
    providerId: string;
  };
}

interface UpdateAmenity {
  id: string;
  providerId: string;
  form: {
    unit: Amenity['unit'];
    amount: number;
    currency: Currency;
    info: string;
  };
}

interface DeleteAmenity {
  id: string;
  providerId: string;
}

export const { getLoaders, useLoaders } = loadersFactory((locale) => ({
  loaders: {
    getAmenity: ({ req, id }: { req?: AppRequest; id: string }) =>
      api('get')<Amenity>(generateUrl(endpoints.amenities.one, { id }), {
        req,
        locale,
      }),
    addAmenity: ({ form }: AddAmenity) =>
      api('post')<Amenity>(generateUrl(endpoints.amenities.index), {
        body: getJsonBody(form),
        locale,
      }),
    updateAmenity: ({ id, form }: UpdateAmenity) =>
      api('patch')<Amenity>(generateUrl(endpoints.amenities.one, { id }), {
        body: getJsonBody(form),
        locale,
      }),
    deleteAmenity: ({ id }: DeleteAmenity) =>
      api('delete')(generateUrl(endpoints.amenities.one, { id }), {
        locale,
      }),
  },
}));
