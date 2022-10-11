import { endpoints } from 'config/endpoints';
import { Request, loadersFactory } from 'tools/services/request';

interface DeleteImage {
  id: string;
}

export const { getLoaders, useLoaders } = loadersFactory((locale) => ({
  loaders: {
    deleteImage: ({ id }: DeleteImage) =>
      new Request(endpoints.images.one.replace(':id', id), {
        locale,
      }).delete(),
  },
}));
