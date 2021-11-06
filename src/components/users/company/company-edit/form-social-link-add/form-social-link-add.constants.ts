import { FormSocialLinkValues } from 'components/users/company/company-edit/form-social-link/form-social-link.types';
import { SocialType } from 'domain/companies/companies.types';

export const FORM_SOCIAL_LINK_ADD_INITIAL_VALUES: FormSocialLinkValues = {
  type: SocialType.Facebook,
  url: '',
};
