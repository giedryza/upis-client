import { IconName } from 'ui';

import { SocialVariant } from './providers.types';

export const boats = [
  'single-kayak',
  'double-kayak',
  'triple-kayak',
  'raft',
] as const;

export const socials = [
  'facebook',
  'instagram',
  'youtube',
  'linkedin',
  'twitter',
] as const;

export const select = ['_id', 'name'] as const;

export const ICON_BY_SOCIAL_LINK_TYPE: Record<SocialVariant, IconName> = {
  facebook: 'logo-facebook',
  instagram: 'logo-instagram',
  youtube: 'logo-youtube',
  linkedin: 'logo-linkedin',
  twitter: 'logo-twitter',
};
