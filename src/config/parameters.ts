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
} as const;
