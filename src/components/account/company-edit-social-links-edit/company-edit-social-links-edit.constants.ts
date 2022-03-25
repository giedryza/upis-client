import { SocialType } from 'domain/social-links/social-links.types';

import { Values } from './company-edit-social-links-edit.types';

export const INITIAL_VALUES: Values = {
  type: SocialType.Facebook,
  url: '',
};
