import { BaseEntity } from 'types/common';

export enum SocialType {
  Facebook = 'facebook',
  Instagram = 'instagram',
  Youtube = 'youtube',
  Linkedin = 'linkedin',
  Twitter = 'twitter',
}

export interface SocialLink extends BaseEntity {
  type: SocialType;
  url: string;
  host: string;
}

export interface SocialLinksFilters {
  host: string;
}
