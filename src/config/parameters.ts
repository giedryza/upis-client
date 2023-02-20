import { z } from 'zod';

import { routes } from './routes';

export const parameters = {
  [routes.tours.one.index]: z.object({
    id: z.coerce.string().catch(''),
    slug: z.coerce.string().catch(''),
  }),
} as const;
