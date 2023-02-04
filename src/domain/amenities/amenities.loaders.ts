import { IncomingMessage } from 'http';

import { endpoints } from 'config/endpoints';
import { Request, getJsonBody, loadersFactory } from 'tools/services';
import { Currency } from 'types/common';
import { generateUrl } from 'tools/common';

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
    getAmenity: ({ req, id }: { req?: IncomingMessage; id: string }) =>
      new Request<Amenity>(generateUrl(endpoints.amenities.one, { id }), {
        req,
        locale,
      }).get(),
    addAmenity: ({ form }: AddAmenity) =>
      new Request<Amenity>(generateUrl(endpoints.amenities.index), {
        body: getJsonBody(form),
        locale,
      }).post(),
    updateAmenity: ({ id, form }: UpdateAmenity) =>
      new Request<Amenity>(generateUrl(endpoints.amenities.one, { id }), {
        body: getJsonBody(form),
        locale,
      }).patch(),
    deleteAmenity: ({ id }: DeleteAmenity) =>
      new Request(generateUrl(endpoints.amenities.one, { id }), {
        locale,
      }).delete(),
  },
}));
