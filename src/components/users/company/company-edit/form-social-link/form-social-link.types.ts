import { SocialType } from 'domain/companies/companies.types';

export interface ComponentProps {
  companyId: string;
  socialLinkId: string;
}

export type FormSocialLinkValues = {
  type: SocialType;
  url: string;
};
