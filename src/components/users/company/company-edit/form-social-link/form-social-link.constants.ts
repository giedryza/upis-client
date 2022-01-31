import { FormSocialLinkValues } from 'components/users/company/company-edit/form-social-link/form-social-link.types';
import { SocialType } from 'domain/companies/companies.types';
import { IconName } from 'ui/icon';

export const FORM_SOCIAL_LINK_INITIAL_VALUES: FormSocialLinkValues = {
  type: SocialType.Facebook,
  url: '',
};

export const ICON_BY_SOCIAL_LINK_TYPE: Record<SocialType, IconName> = {
  [SocialType.Facebook]: IconName.Facebook,
  [SocialType.Instagram]: IconName.Instagram,
  [SocialType.Youtube]: IconName.Youtube,
  [SocialType.Linkedin]: IconName.Linkedin,
  [SocialType.Twitter]: IconName.Twitter,
};
