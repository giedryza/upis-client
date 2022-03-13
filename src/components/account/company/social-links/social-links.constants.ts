import { IconName } from 'ui';
import { SocialType } from 'domain/companies/companies.types';

export const ICON_BY_SOCIAL_LINK_TYPE: Record<SocialType, IconName> = {
  [SocialType.Facebook]: IconName.LogoFacebook,
  [SocialType.Instagram]: IconName.LogoInstagram,
  [SocialType.Youtube]: IconName.LogoYoutube,
  [SocialType.Linkedin]: IconName.LogoLinkedin,
  [SocialType.Twitter]: IconName.LogoTwitter,
};
