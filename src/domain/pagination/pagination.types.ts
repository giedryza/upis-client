import { z } from 'zod';

import { paginationFilters } from 'tools/services/url';

export type PaginationFilters = z.infer<typeof paginationFilters>;
