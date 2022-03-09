import { IncomingMessage } from 'http';

import { endpoints } from 'config/endpoints';
import {
  CompaniesFilters,
  Company,
  SocialLink,
  SocialType,
} from 'domain/companies/companies.types';
import { Http } from 'tools/libs/http/http.lib';
import { Response, ResponseWithMeta } from 'tools/libs/http/http.types';
import { Pagination } from 'types/common/pagination';

export const adapters = {
  getCompanies: ({
    req,
    params,
  }: { req?: IncomingMessage; params?: CompaniesFilters } = {}) =>
    new Http<ResponseWithMeta<Company[], Pagination>>(
      endpoints.companies.index,
      {
        req,
        params,
      }
    ).get(),
  getCompany: ({ req, slug }: { req?: IncomingMessage; slug: string }) =>
    new Http<Response<Company | null>>(
      endpoints.companies.one.replace(':id', slug),
      {
        req,
      }
    ).get(),
  updateCompany: ({
    id,
    form,
  }: {
    id: string;
    form: Partial<
      Pick<
        Company,
        'name' | 'phone' | 'email' | 'description' | 'website' | 'address'
      >
    >;
  }) =>
    new Http<Response<Company>>(endpoints.companies.one.replace(':id', id), {
      body: form,
    }).patch(),
  createCompany: ({
    form,
  }: {
    form: Pick<Company, 'name' | 'phone' | 'email' | 'description'>;
  }) =>
    new Http<Response<Company>>(endpoints.companies.index, {
      body: form,
    }).post(),
  updateLocation: ({
    id,
    form,
  }: {
    id: string;
    form: { lat: number; lng: number; address: string };
  }) =>
    new Http<Response<Company>>(endpoints.companies.one.replace(':id', id), {
      body: {
        address: form.address,
        location: {
          coordinates: [form.lng, form.lat],
        },
      },
    }).patch(),
  addSocialLink: ({
    form,
    companyId,
  }: {
    form: { url: string; type: SocialType };
    companyId: string;
  }) =>
    new Http<Response<SocialLink>>(endpoints.socialLinks.index, {
      body: { ...form, host: companyId },
    }).post(),
  updateSocialLink: ({
    form,
    socialLinkId,
  }: {
    form: Partial<{ url: string; type: SocialType }>;
    socialLinkId: string;
  }) =>
    new Http<Response<SocialLink>>(
      endpoints.socialLinks.one.replace(':id', socialLinkId),
      {
        body: form,
      }
    ).patch(),
  deleteSocialLink: ({ socialLinkId }: { socialLinkId: string }) =>
    new Http<Response<SocialLink>>(
      endpoints.socialLinks.one.replace(':id', socialLinkId)
    ).delete(),
};
