import { IncomingMessage } from 'http';

import { endpoints } from 'config/endpoints';
import { Request, getJsonBody, loadersFactory } from 'tools/services/request';
import { Currency } from 'types/common';

import { Amenity } from './amenities.types';

interface AddAmenity {
  form: {
    variant: Amenity['variant'];
    unit: Amenity['unit'];
    amount: number;
    currency: Currency;
    info: string;
    companyId: string;
  };
}

interface UpdateAmenity {
  id: string;
  companyId: string;
  form: {
    variant: Amenity['variant'];
    unit: Amenity['unit'];
    amount: number;
    currency: Currency;
    info: string;
  };
}

interface DeleteAmenity {
  id: string;
  companyId: string;
}

export const { getLoaders, useLoaders } = loadersFactory((locale) => ({
  loaders: {
    getAmenity: ({ req, id }: { req?: IncomingMessage; id: string }) =>
      new Request<Amenity>(endpoints.amenities.one.replace(':id', id), {
        req,
        locale,
      }).get(),
    addAmenity: ({ form }: AddAmenity) =>
      new Request<Amenity>(endpoints.amenities.index, {
        body: getJsonBody(form),
        locale,
      }).post(),
    updateAmenity: ({ id, form }: UpdateAmenity) =>
      new Request<Amenity>(endpoints.amenities.one.replace(':id', id), {
        body: getJsonBody(form),
        locale,
      }).patch(),
    deleteAmenity: ({ id }: DeleteAmenity) =>
      new Request(endpoints.amenities.one.replace(':id', id), {
        locale,
      }).delete(),
  },
}));
