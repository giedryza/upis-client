export enum SocialType {
  Facebook = 'facebook',
  Instagram = 'instagram',
  Youtube = 'youtube',
  Linkedin = 'linkedin',
  Twitter = 'twitter',
}

export interface SocialLink {
  _id: string;
  type: SocialType;
  url: string;
  host: string;
}

export interface SocialLinksFilters {
  host: string;
}
