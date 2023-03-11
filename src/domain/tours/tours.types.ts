import { z } from 'zod';

import { TOURS } from 'config';
import { AppFile, BaseEntity, GeoPoint, Price } from 'types/common';
import { toursFilters } from 'tools/services';
import { Provider } from 'domain/providers';
import { Amenity, Variant } from 'domain/amenities';

export type Region = (typeof TOURS.regions)[number];

export type River = (typeof TOURS.rivers)[number];

export type Difficulty = (typeof TOURS.difficulty)[number];

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
