import { Currency } from 'types/common';
import { Amenity } from 'domain/amenities';

export interface Values {
  variant: Amenity['variant'];
  unit: Amenity['unit'];
  amount: number;
  currency: Currency;
  info: string;
  companyId: string;
}
