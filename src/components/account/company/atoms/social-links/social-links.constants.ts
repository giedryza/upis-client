import { IconName } from 'ui';
import { SocialType } from 'domain/social-links/social-links.types';

export const ICON_BY_SOCIAL_LINK_TYPE: Record<SocialType, IconName> = {
  [SocialType.Facebook]: 'logo-facebook',
  [SocialType.Instagram]: 'logo-instagram',
  [SocialType.Youtube]: 'logo-youtube',
  [SocialType.Linkedin]: 'logo-linkedin',
  [SocialType.Twitter]: 'logo-twitter',
};
