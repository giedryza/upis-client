import { z } from 'zod';

import { paginationFilters } from 'tools/services';

export type PaginationFilters = z.infer<typeof paginationFilters>;
