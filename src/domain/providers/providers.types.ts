import { z } from 'zod';

import { SocialLink } from 'domain/social-links';
import { Amenity } from 'domain/amenities';
import { BaseEntity, GeoPoint, Language } from 'types/common';
import { paginationFilters } from 'domain/pagination';

export const boats = [
  'single-kayak',
  'double-kayak',
  'triple-kayak',
  'raft',
] as const;

export type Boat = (typeof boats)[number];

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
  socialLinks: SocialLink[];
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

const queryUtils = {
  select: ['_id', 'name'],
} as const;

const utilsFilters = z.object({
  select: z.array(z.enum(queryUtils.select)).catch([]),
});

export const providersFilters = z
  .object({
    user: z.coerce.string(),
  })
  .merge(utilsFilters)
  .merge(paginationFilters);

export type ProvidersFilters = z.infer<typeof providersFilters>;
