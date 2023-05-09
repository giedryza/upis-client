import { z } from 'zod';

export const items = {
  favorites: z.array(z.string()).catch([]),
};
