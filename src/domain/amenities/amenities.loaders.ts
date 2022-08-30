import { endpoints } from 'config/endpoints';
import { Request, getJsonBody } from 'tools/services/request';
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

export const loaders = {
  addAmenity: ({ form }: AddAmenity) =>
    new Request<Amenity>(endpoints.amenities.index, {
      body: getJsonBody(form),
    }).post(),
};
