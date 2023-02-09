import { z } from 'zod';

export const paginationFilters = z.object({
  page: z.coerce.number().finite().int().min(1).catch(1),
  limit: z.coerce.number().finite().int().min(1).catch(15),
});

export type PaginationFilters = z.infer<typeof paginationFilters>;
