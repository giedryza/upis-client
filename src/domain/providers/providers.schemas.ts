import { z } from 'zod';

import { toArray } from 'tools/common';
import { paginationFilters } from 'domain/pagination';
import { PROVIDERS } from 'config';

export const providersFilters = z
  .object({
    user: z.coerce.string(),
    select: z.preprocess(toArray, z.array(z.enum(PROVIDERS.select))).catch([]),
  })
  .merge(paginationFilters)
  .partial();
