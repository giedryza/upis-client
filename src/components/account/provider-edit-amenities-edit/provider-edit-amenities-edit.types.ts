import { Currency } from 'types/common';
import { Amenity } from 'domain/amenities';

export interface Values {
  unit: Amenity['unit'];
  amount: number;
  currency: Currency;
  info: string;
  isFree: boolean;
}
