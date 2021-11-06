import { SocialType } from 'domain/companies/companies.types';

export interface ComponentProps {
  companyId: string;
}

export type FormSocialLinkAddValues = {
  type: SocialType;
  url: string;
};
