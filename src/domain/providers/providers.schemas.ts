import { z } from 'zod';

import { toArray } from 'tools/common';
import { paginationFilters } from 'domain/pagination';

import { select } from './providers.constants';

export const providersFilters = z
  .object({
    user: z.coerce.string(),
    select: z.preprocess(toArray, z.array(z.enum(select))).catch([]),
  })
  .merge(paginationFilters)
  .partial();
