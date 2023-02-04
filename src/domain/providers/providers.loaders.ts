import { IncomingMessage } from 'http';

import { endpoints } from 'config/endpoints';
import {
  Request,
  getFormDataBody,
  getJsonBody,
  loadersFactory,
} from 'tools/services';
import { Pagination } from 'types/api';
import { generateUrl } from 'tools/common';

import { ProvidersFilters, Provider } from './providers.types';

export const { getLoaders, useLoaders } = loadersFactory((locale) => ({
  loaders: {
    getProviders: ({
      req,
      params,
    }: { req?: IncomingMessage; params?: ProvidersFilters } = {}) =>
      new Request<Provider[], Pagination>(
        generateUrl(endpoints.providers.index),
        {
          req,
          params,
          locale,
        }
      ).get(),
    getProvider: ({ req, id }: { req?: IncomingMessage; id: string }) =>
      new Request<Provider | null>(
        generateUrl(endpoints.providers.one.index, { id }),
        { req, locale }
      ).get(),
    createProvider: ({
      form,
    }: {
      form: Pick<Provider, 'name' | 'phone' | 'email' | 'description'>;
    }) =>
      new Request<Provider>(generateUrl(endpoints.providers.index), {
        body: getJsonBody(form),
        locale,
      }).post(),
    updateProvider: ({
      id,
      form,
    }: {
      id: string;
      form: Partial<
        Pick<
          Provider,
          | 'name'
          | 'phone'
          | 'email'
          | 'description'
          | 'website'
          | 'address'
          | 'languages'
          | 'boats'
        >
      >;
    }) =>
      new Request<Provider>(
        generateUrl(endpoints.providers.one.index, { id }),
        {
          body: getJsonBody(form),
          locale,
        }
      ).patch(),
    updateLocation: ({
      id,
      form,
    }: {
      id: string;
      form: { lat: number; lng: number; address: string };
    }) =>
      new Request<Provider>(
        generateUrl(endpoints.providers.one.index, { id }),
        {
          body: getJsonBody({
            address: form.address,
            ...(form.lat && form.lng && { location: [form.lng, form.lat] }),
          }),
          locale,
        }
      ).patch(),
    uploadLogo: ({ id, logo }: { id: string; logo: File }) =>
      new Request<Provider>(generateUrl(endpoints.providers.one.logo, { id }), {
        body: getFormDataBody([{ field: 'logo', value: logo }]),
        locale,
      }).patch(),
    deleteProvider: ({ id }: { id: string }) =>
      new Request(generateUrl(endpoints.providers.one.index, { id }), {
        locale,
      }).delete(),
  },
}));
