import { z } from 'zod';

import { routes } from './routes';

const utils = {
  id: z.object({
    id: z.coerce.string().catch(''),
  }),
};

export const parameters = {
  ...utils,
  [routes.tours.one.index]: z
    .object({
      slug: z.coerce.string().catch(''),
    })
    .merge(utils.id),
  [routes.account.providers.one.amenities.add]: z.object({}).merge(utils.id),
  [routes.account.providers.one.amenities.one]: z
    .object({
      amenityId: z.coerce.string().catch(''),
    })
    .merge(utils.id),
  [routes.account.providers.one.socials.add]: z.object({}).merge(utils.id),
  [routes.account.providers.one.socials.one]: z
    .object({
      socialId: z.coerce.string().catch(''),
    })
    .merge(utils.id),
  [routes.account.tours.one.gallery.one]: z
    .object({
      imageId: z.coerce.string().catch(''),
    })
    .merge(utils.id),
} as const;
