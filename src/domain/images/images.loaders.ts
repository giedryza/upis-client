import { IncomingMessage } from 'http';

import { endpoints } from 'config/endpoints';
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
      new Request<Image>(endpoints.images.one.replace(':id', id), {
        req,
        locale,
      }).get(),
    updateImage: ({ id, form }: UpdateImage) =>
      new Request<Image>(endpoints.images.one.replace(':id', id), {
        body: getJsonBody(form),
        locale,
      }).patch(),
    deleteImage: ({ id }: DeleteImage) =>
      new Request(endpoints.images.one.replace(':id', id), {
        locale,
      }).delete(),
  },
}));
