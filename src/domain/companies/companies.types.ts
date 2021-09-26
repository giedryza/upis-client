import { Reducer } from 'redux';

import { Actions } from 'types/common/redux';

export enum SocialType {
  Facebook = 'facebook',
  Instagram = 'instagram',
  Youtube = 'youtube',
  Linkedin = 'linkedin',
  Twitter = 'twitter',
}

export interface Social {
  type: SocialType;
  link: string;
}

export interface Company {
  _id: string;
  name: string;
  phone: string;
  email: string;
  slug: string;
  description: string;
  website: string;
  social: Social[];
  address: string;
  user: string;
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

export enum CompanyFormStep {
  Info = 'info',
  Network = 'network',
  Logo = 'logo',
  Location = 'location',
  Tours = 'tours',
}

export interface CompaniesState {
  company: Company | null;
  step: CompanyFormStep;
  loading: boolean;
}

export enum CompaniesActionTypes {
  SetCompany = 'companies/SET_COMPANY',
  SetStep = 'companies/SET_STEP',
  SetLoading = 'companies/SET_LOADING',
  ClearCompany = 'companies/CLEAR_COMPANY',
}

export type CompaniesPayloads = {
  [CompaniesActionTypes.SetCompany]: Company | null;
  [CompaniesActionTypes.SetStep]: CompanyFormStep;
  [CompaniesActionTypes.SetLoading]: boolean;
  [CompaniesActionTypes.ClearCompany]: undefined;
};

export type CompaniesActions = Actions<CompaniesPayloads>;

export type CompaniesReducer = Reducer<CompaniesState, CompaniesActions>;
