import { SocialType } from 'domain/social-links';

import { Values } from './provider-edit-social-links-add.types';

export const INITIAL_VALUES: Values = {
  type: SocialType.Facebook,
  url: '',
};
