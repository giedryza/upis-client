import { SocialLink } from 'domain/social-links';
import { Amenity } from 'domain/amenities';
import { BaseEntity, Language } from 'types/common';

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
