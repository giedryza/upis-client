import { IncomingMessage } from 'http';

import { endpoints } from 'config';
import {
  Request,
  getFormDataBody,
  getJsonBody,
  loadersFactory,
} from 'tools/services';
import { Pagination } from 'types/api';
import { generateUrl } from 'tools/services/url';

import {
  ProvidersFilters,
  Provider,
  SocialVariant,
  Social,
} from './providers.types';

interface GetProviders {
  req?: IncomingMessage;
  params?: Partial<ProvidersFilters>;
}

interface GetProvider {
  req?: IncomingMessage;
  id: string;
}

interface CreateProvider {
  form: Pick<Provider, 'name' | 'phone' | 'email' | 'description'>;
}

interface UpdateProvider {
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
}

interface UpdateLocation {
  id: string;
  form: { lat: number; lng: number; address: string };
}

interface UploadLogo {
  id: string;
  logo: File;
}

interface DeleteProvider {
  id: string;
}

export const { getLoaders, useLoaders } = loadersFactory((locale) => ({
  loaders: {
    getProviders: ({ req, params }: GetProviders = {}) =>
      new Request<Provider[], Pagination>(
        generateUrl(endpoints.providers.index),
        {
          req,
          params: {
            limit: 15,
            ...params,
          },
          locale,
        }
      ).get(),
    getProvider: ({ req, id }: GetProvider) =>
      new Request<Provider | null>(
        generateUrl(endpoints.providers.one.index, { id }),
        { req, locale }
      ).get(),
    createProvider: ({ form }: CreateProvider) =>
      new Request<Provider>(generateUrl(endpoints.providers.index), {
        body: getJsonBody(form),
        locale,
      }).post(),
    updateProvider: ({ id, form }: UpdateProvider) =>
      new Request<Provider>(
        generateUrl(endpoints.providers.one.index, { id }),
        {
          body: getJsonBody(form),
          locale,
        }
      ).patch(),
    updateLocation: ({ id, form }: UpdateLocation) =>
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
    uploadLogo: ({ id, logo }: UploadLogo) =>
      new Request<Provider>(generateUrl(endpoints.providers.one.logo, { id }), {
        body: getFormDataBody([{ field: 'logo', value: logo }]),
        locale,
      }).patch(),
    addSocialLink: ({
      id,
      form,
    }: {
      id: string;
      form: { url: string; type: SocialVariant };
    }) =>
      new Request<Social>(
        generateUrl(endpoints.providers.one.socials, { id }),
        {
          body: getJsonBody(form),
          locale,
        }
      ).post(),
    updateSocialLink: ({
      form,
      id,
    }: {
      id: string;
      form: { id: string; url: string; type: SocialVariant };
    }) =>
      new Request<Social>(
        generateUrl(endpoints.providers.one.socials, { id }),
        {
          body: getJsonBody(form),
          locale,
        }
      ).patch(),
    deleteSocialLink: ({ id, form }: { id: string; form: { id: string } }) =>
      new Request(generateUrl(endpoints.providers.one.socials, { id }), {
        body: getJsonBody(form),
        locale,
      }).delete(),
    deleteProvider: ({ id }: DeleteProvider) =>
      new Request(generateUrl(endpoints.providers.one.index, { id }), {
        locale,
      }).delete(),
  },
}));
