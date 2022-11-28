import { IncomingMessage } from 'http';

import { endpoints } from 'config/endpoints';
import { generateRoute } from 'tools/common';
import { Request, loadersFactory, getJsonBody } from 'tools/services/request';

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
    getImage: ({ req, id }: { req?: IncomingMessage; id: string }) =>
      new Request<Image>(generateRoute(endpoints.images.one, { id }), {
        req,
        locale,
      }).get(),
    updateImage: ({ id, form }: UpdateImage) =>
      new Request<Image>(generateRoute(endpoints.images.one, { id }), {
        body: getJsonBody(form),
        locale,
      }).patch(),
    deleteImage: ({ id }: DeleteImage) =>
      new Request(generateRoute(endpoints.images.one, { id }), {
        locale,
      }).delete(),
  },
}));
