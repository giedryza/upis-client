import { z } from 'zod';

import { BaseEntity, GeoPoint, Language } from 'types/common';
import { Amenity } from 'domain/amenities';

import { providersFilters } from './providers.schemas';
import { boats, socials } from './providers.constants';

export type Boat = (typeof boats)[number];

export type SocialVariant = (typeof socials)[number];

export interface Social extends BaseEntity {
  type: SocialVariant;
  url: string;
}

export interface Provider extends BaseEntity {
  name: string;
  phone: string;
  email: string;
  slug: string;
  description: string;
  website: string;
  address: string;
  user: string;
  amenities: Amenity[];
  socials: Social[];
  languages: Language[];
  boats: Boat[];
  location: GeoPoint;
  logo: {
    location: string;
    key?: string;
    contentType?: string;
  };
  createdAt: string;
  updatedAt: string;
}

export type ProvidersFilters = z.infer<typeof providersFilters>;
