import { Company } from 'domain/companies';
import { AppFile, Currency, Language, Price } from 'types/common';

export const regions = [
  'aukstaitija',
  'dzukija',
  'mazoji-lietuva',
  'suvalkija',
  'zemaitija',
] as const;

export const amenityVariants = [
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

export const boats = ['single-kayak', 'double-kayak', 'triple-kayak'] as const;

export const units = ['tour', 'day', 'h', 'km'] as const;

export const difficulty = [1, 2, 3, 4, 5] as const;

export type Region = typeof regions[number];

export type River = string;

export type AmenityVariant = typeof amenityVariants[number];

export type Boat = typeof boats[number];

export type Unit = typeof units[number];

export type Difficulty = typeof difficulty[number];

export interface Amenity {
  variant: AmenityVariant;
  price: number;
  currency: Currency;
  unit: Unit;
  info: string;
}

export interface Tour {
  _id: string;
  name: string;
  slug: string;
  description: string;
  departure: string;
  arrival: string;
  distance: number | null;
  duration: number | null;
  days: number;
  rivers: string[];
  regions: Region[];
  difficulty: number;
  price: Price | null;
  photos: AppFile[];
  company: Company;
  website: string;
  amenities: Amenity[];
  boats: Boat[];
  languages: Language[];
  createdAt: Date;
  updatedAt: Date;
}

export interface ToursFilters {
  user?: string;
  select?: (keyof Tour)[];
}
