import { z } from 'zod';

import { PROVIDERS } from 'config';
import { providersFilters } from 'tools/services';
import { BaseEntity, GeoPoint, Language } from 'types/common';
import { Amenity } from 'domain/amenities';

export type Boat = (typeof PROVIDERS.boats)[number];

export type SocialVariant = (typeof PROVIDERS.socials)[number];

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
