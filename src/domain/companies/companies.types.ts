import { SocialLink } from 'domain/social-links';
import { Amenity } from 'domain/amenities';
import { BaseEntity, Language } from 'types/common';

export const boats = [
  'single-kayak',
  'double-kayak',
  'triple-kayak',
  'raft',
] as const;

export type Boat = typeof boats[number];

export interface Company extends BaseEntity {
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
  location: {
    coordinates: number[];
  };
  logo: {
    location: string;
    key?: string;
    contentType?: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface CompaniesFilters {
  user?: string;
  select?: (keyof Company)[];
}
