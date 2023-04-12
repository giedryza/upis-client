import { endpoints } from 'config';
import { generateUrl, loadersFactory, getJsonBody, api } from 'tools/services';
import { AppRequest } from 'types/common';

import { Image } from './images.types';

interface UpdateImage {
  id: string;
  form: {
    description: string;
  };
}

interface DeleteImage {
  id: string;
}

export const { getLoaders, useLoaders } = loadersFactory((locale) => ({
  loaders: {
    getImage: ({ req, id }: { req?: AppRequest; id: string }) =>
      api('get')<Image>(generateUrl(endpoints.images.one, { id }), {
        req,
        locale,
      }),
    updateImage: ({ id, form }: UpdateImage) =>
      api('patch')<Image>(generateUrl(endpoints.images.one, { id }), {
        body: getJsonBody(form),
        locale,
        auth: true,
      }),
    deleteImage: ({ id }: DeleteImage) =>
      api('delete')(generateUrl(endpoints.images.one, { id }), {
        locale,
        auth: true,
      }),
  },
}));
