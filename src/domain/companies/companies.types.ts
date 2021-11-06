import { Reducer } from 'redux';

import { Actions } from 'types/common/redux';

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
}

export interface Company {
  _id: string;
  name: string;
  phone: string;
  email: string;
  slug: string;
  description: string;
  website: string;
  address: string;
  user: string;
  socialLinks: SocialLink[];
  location: {
    coordinates: number[];
  };
  logo: {
    location: string;
    key?: string;
    contentType?: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface CompaniesState {
  company: Company | null;
  loading: boolean;
}

export enum CompaniesActionTypes {
  SetCompany = 'companies/SET_COMPANY',
  UpdateCompany = 'companies/UPDATE_COMPANY',
  SetLoading = 'companies/SET_LOADING',
  ClearCompany = 'companies/CLEAR_COMPANY',
}

export type CompaniesPayloads = {
  [CompaniesActionTypes.SetCompany]: Company | null;
  [CompaniesActionTypes.UpdateCompany]: Partial<Company>;
  [CompaniesActionTypes.SetLoading]: boolean;
  [CompaniesActionTypes.ClearCompany]: undefined;
};

export type CompaniesActions = Actions<CompaniesPayloads>;

export type CompaniesReducer = Reducer<CompaniesState, CompaniesActions>;
