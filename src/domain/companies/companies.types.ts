import { Reducer } from 'redux';

import { SetError } from 'types/common/forms';
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
  description?: string;
  website?: string;
  social?: Social[];
  address?: string;
  user: string;
  location?: {
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
  step: number;
  loading: boolean;
}

export enum CompaniesActionTypes {
  SetCompany = 'companies/SET_COMPANY',
  SetStep = 'companies/SET_STEP',
  SetLoading = 'companies/SET_LOADING',
  CreateCompany = 'companies/CREATE_COMPANY',
  UpdateCompany = 'companies/UPDATE_COMPANY',
  SubmitCompanyForm = 'companies/SUBMIT_COMPANY_FORM',
  ClearCompany = 'companies/CLEAR_COMPANY',
}

export type CompaniesPayloads = {
  [CompaniesActionTypes.SetCompany]: Company | null;
  [CompaniesActionTypes.SetStep]: number;
  [CompaniesActionTypes.SetLoading]: boolean;
  [CompaniesActionTypes.CreateCompany]: Pick<
    Company,
    'name' | 'phone' | 'email'
  >;
  [CompaniesActionTypes.UpdateCompany]: Partial<
    Pick<
      Company,
      'name' | 'phone' | 'email' | 'description' | 'website' | 'address'
    >
  >;
  [CompaniesActionTypes.SubmitCompanyForm]: {
    form:
      | CompaniesPayloads[CompaniesActionTypes.CreateCompany]
      | CompaniesPayloads[CompaniesActionTypes.UpdateCompany];
    setError: SetError<
      | CompaniesPayloads[CompaniesActionTypes.CreateCompany]
      | CompaniesPayloads[CompaniesActionTypes.UpdateCompany]
    >;
  };
  [CompaniesActionTypes.ClearCompany]: undefined;
};

export type CompaniesActions = Actions<CompaniesPayloads>;

export type CompaniesReducer = Reducer<CompaniesState, CompaniesActions>;
