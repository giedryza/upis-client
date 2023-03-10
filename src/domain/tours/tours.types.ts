import { z } from 'zod';

import { AppFile, BaseEntity, GeoPoint, Price } from 'types/common';

import { Provider } from '../providers';
import { Amenity, Variant } from '../amenities';

import { toursFilters } from './tours.schemas';
import { regions, rivers, difficulty } from './tours.constants';

export type Region = (typeof regions)[number];

export type River = (typeof rivers)[number];

export type Difficulty = (typeof difficulty)[number];

export interface Tour extends BaseEntity {
  name: string;
  slug: string;
  description: string;
  departure: GeoPoint;
  arrival: GeoPoint;
  distance: number | null;
  duration: number | null;
  days: number;
  rivers: River[];
  regions: Region[];
  difficulty: number;
  price: Price | null;
  photos: AppFile[];
  primaryPhoto: string;
  provider: Provider;
  website: string;
  amenities: { _id: Amenity; variant: Variant }[];
  user: string;
  score: number;
  createdAt: Date;
  updatedAt: Date;
}

export type ToursFilters = z.infer<typeof toursFilters>;

export interface FiltersSummary {
  distance: { min: number; max: number };
  days: { min: number; max: number };
  duration: { min: number; max: number };
  difficulty: { min: number; max: number };
}
