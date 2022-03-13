import { FormSocialLinkValues } from 'components/account/company/company-edit/form-social-link/form-social-link.types';
import { SocialType } from 'domain/companies/companies.types';
import { IconName } from 'ui';

export const FORM_SOCIAL_LINK_INITIAL_VALUES: FormSocialLinkValues = {
  type: SocialType.Facebook,
  url: '',
};

export const ICON_BY_SOCIAL_LINK_TYPE: Record<SocialType, IconName> = {
  [SocialType.Facebook]: IconName.LogoFacebook,
  [SocialType.Instagram]: IconName.LogoInstagram,
  [SocialType.Youtube]: IconName.LogoYoutube,
  [SocialType.Linkedin]: IconName.LogoLinkedin,
  [SocialType.Twitter]: IconName.LogoTwitter,
};
