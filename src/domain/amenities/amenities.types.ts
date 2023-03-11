import { AMENITIES } from 'config';
import { BaseEntity, Price } from 'types/common';

export type Variant = (typeof AMENITIES.variants)[number];

export type Unit = (typeof AMENITIES.units)[number];

export interface Amenity extends BaseEntity {
  variant: Variant;
  price: Price | null;
  unit: Unit;
  info: string;
}
