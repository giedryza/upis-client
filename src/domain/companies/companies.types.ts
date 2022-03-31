import { SocialLink } from 'domain/social-links';

export interface Company {
  _id: string;
  name: string;
  phone: string;
  email: string;
  slug: string;
  description: string;
  website: string;
  address: string;
  user: string;
  socialLinks: SocialLink[];
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
}
