import { IncomingMessage } from 'http';

import { endpoints } from 'config/endpoints';
import { Request, getFilesBody, getJsonBody } from 'tools/services/request';
import { Pagination } from 'types/common';

import { CompaniesFilters, Company } from './companies.types';

export const loaders = {
  getCompanies: ({
    req,
    params,
  }: { req?: IncomingMessage; params?: CompaniesFilters } = {}) =>
    new Request<Company[], Pagination>(endpoints.companies.index, {
      req,
      params,
    }).get(),
  getCompany: ({ req, slug }: { req?: IncomingMessage; slug: string }) =>
    new Request<Company | null>(
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
    new Request<Company>(endpoints.companies.index, {
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
    new Request<Company>(endpoints.companies.one.index.replace(':id', id), {
      body: getJsonBody(form),
    }).patch(),
  updateLocation: ({
    id,
    form,
  }: {
    id: string;
    form: { lat: number; lng: number; address: string };
  }) =>
    new Request<Company>(endpoints.companies.one.index.replace(':id', id), {
      body: getJsonBody({
        address: form.address,
        ...(form.lat &&
          form.lng && { location: { coordinates: [form.lng, form.lat] } }),
      }),
    }).patch(),
  uploadLogo: ({ id, logo }: { id: string; logo: File }) =>
    new Request<Company>(endpoints.companies.one.logo.replace(':id', id), {
      body: getFilesBody([{ field: 'logo', file: logo }]),
    }).patch(),
  deleteCompany: ({ id }: { id: string }) =>
    new Request(endpoints.companies.one.index.replace(':id', id)).delete(),
};
