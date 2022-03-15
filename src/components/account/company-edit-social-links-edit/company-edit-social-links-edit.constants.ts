import { SocialType } from 'domain/companies/companies.types';

import { Values } from './company-edit-social-links-edit.types';

export const INITIAL_VALUES: Values = {
  type: SocialType.Facebook,
  url: '',
};
