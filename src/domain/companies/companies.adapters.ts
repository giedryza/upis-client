import { IncomingMessage } from 'http';

import { endpoints } from 'config/endpoints';
import {
  CompaniesFilters,
  Company,
  SocialLink,
  SocialType,
} from 'domain/companies/companies.types';
import { Http } from 'tools/libs/http/http.lib';
import { getFilesBody, getJsonBody } from 'tools/libs/http/http.utils';
import { Response, ResponseWithMeta } from 'tools/libs/http/http.types';
import { Pagination } from 'types/common';

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
      endpoints.companies.one.index.replace(':id', slug),
      {
        req,
      }
    ).get(),
  createCompany: ({
    form,
  }: {
    form: Pick<Company, 'name' | 'phone' | 'email' | 'description'>;
  }) =>
    new Http<Response<Company>>(endpoints.companies.index, {
      body: getJsonBody(form),
    }).post(),
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
    new Http<Response<Company>>(
      endpoints.companies.one.index.replace(':id', id),
      {
        body: getJsonBody(form),
      }
    ).patch(),
  updateLocation: ({
    id,
    form,
  }: {
    id: string;
    form: { lat: number; lng: number; address: string };
  }) =>
    new Http<Response<Company>>(
      endpoints.companies.one.index.replace(':id', id),
      {
        body: getJsonBody({
          address: form.address,
          ...(form.lat &&
            form.lng && { location: { coordinates: [form.lng, form.lat] } }),
        }),
      }
    ).patch(),
  uploadLogo: ({ id, logo }: { id: string; logo: File }) =>
    new Http<Response<Company>>(
      endpoints.companies.one.logo.replace(':id', id),
      {
        body: getFilesBody([{ field: 'logo', file: logo }]),
      }
    ).patch(),
  deleteCompany: ({ id }: { id: string }) =>
    new Http(endpoints.companies.one.index.replace(':id', id)).delete(),
  getSocialLink: ({ req, id }: { req?: IncomingMessage; id: string }) =>
    new Http<Response<SocialLink>>(
      endpoints.socialLinks.one.replace(':id', id),
      {
        req,
      }
    ).get(),
  addSocialLink: ({
    form,
    companyId,
  }: {
    form: { url: string; type: SocialType };
    companyId: string;
  }) =>
    new Http<Response<SocialLink>>(endpoints.socialLinks.index, {
      body: getJsonBody({ ...form, host: companyId }),
    }).post(),
  updateSocialLink: ({
    form,
    id,
  }: {
    form: Partial<{ url: string; type: SocialType }>;
    id: string;
  }) =>
    new Http<Response<SocialLink>>(
      endpoints.socialLinks.one.replace(':id', id),
      {
        body: getJsonBody(form),
      }
    ).patch(),
  deleteSocialLink: ({ id }: { id: string }) =>
    new Http(endpoints.socialLinks.one.replace(':id', id)).delete(),
};
