import { endpoints } from 'config';
import {
  generateUrl,
  getFormDataBody,
  getJsonBody,
  loadersFactory,
  api,
} from 'tools/services';
import { Pagination } from 'types/api';
import { AppRequest } from 'types/common';

import {
  ProvidersFilters,
  Provider,
  SocialVariant,
  Social,
} from './providers.types';

interface GetProviders {
  req?: AppRequest;
  params?: Partial<ProvidersFilters>;
}

interface GetProvider {
  req?: AppRequest;
  id: string;
}

interface CreateProvider {
  form: Pick<Provider, 'name' | 'phone' | 'email'>;
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
      api('get')<Provider[], Pagination>(
        generateUrl(endpoints.providers.index),
        {
          req,
          params: {
            limit: 15,
            ...params,
          },
          locale,
        }
      ),
    getProvider: ({ req, id }: GetProvider) =>
      api('get')<Provider | null>(
        generateUrl(endpoints.providers.one.index, { id }),
        { req, locale }
      ),
    createProvider: ({ form }: CreateProvider) =>
      api('post')<Provider>(generateUrl(endpoints.providers.index), {
        body: getJsonBody(form),
        locale,
      }),
    updateProvider: ({ id, form }: UpdateProvider) =>
      api('patch')<Provider>(
        generateUrl(endpoints.providers.one.index, { id }),
        {
          body: getJsonBody(form),
          locale,
        }
      ),
    updateLocation: ({ id, form }: UpdateLocation) =>
      api('patch')<Provider>(
        generateUrl(endpoints.providers.one.index, { id }),
        {
          body: getJsonBody({
            address: form.address,
            ...(form.lat && form.lng && { location: [form.lng, form.lat] }),
          }),
          locale,
        }
      ),
    uploadLogo: ({ id, logo }: UploadLogo) =>
      api('patch')<Provider>(
        generateUrl(endpoints.providers.one.logo, { id }),
        {
          body: getFormDataBody([{ field: 'logo', value: logo }]),
          locale,
        }
      ),
    addSocialLink: ({
      id,
      form,
    }: {
      id: string;
      form: { url: string; type: SocialVariant };
    }) =>
      api('post')<Social>(
        generateUrl(endpoints.providers.one.socials, { id }),
        {
          body: getJsonBody(form),
          locale,
        }
      ),
    updateSocialLink: ({
      form,
      id,
    }: {
      id: string;
      form: { id: string; url: string; type: SocialVariant };
    }) =>
      api('patch')<Social>(
        generateUrl(endpoints.providers.one.socials, { id }),
        {
          body: getJsonBody(form),
          locale,
        }
      ),
    deleteSocialLink: ({ id, form }: { id: string; form: { id: string } }) =>
      api('delete')(generateUrl(endpoints.providers.one.socials, { id }), {
        body: getJsonBody(form),
        locale,
      }),
    deleteProvider: ({ id }: DeleteProvider) =>
      api('delete')(generateUrl(endpoints.providers.one.index, { id }), {
        locale,
      }),
  },
}));
