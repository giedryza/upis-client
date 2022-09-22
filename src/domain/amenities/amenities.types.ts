import { BaseEntity, Price } from 'types/common';

export const variants = [
  'transport',
  'child-seat',
  'life-vest',
  'phone-case',
  'dry-bag',
  'tent',
  'sleeping-bag',
  'grill',
  'guide',
  'camera',
  'pet-friendly',
] as const;

export const units = ['tour', 'person', 'day', 'h', 'km'] as const;

export type Variant = typeof variants[number];

export type Unit = typeof units[number];

export interface Amenity extends BaseEntity {
  variant: Variant;
  price: Price | null;
  unit: Unit;
  info: string;
}
