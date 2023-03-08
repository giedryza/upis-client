import { z } from 'zod';

import { toArray } from 'tools/common';
import { paginationFilters } from 'domain/pagination';
import { amenities } from 'domain/amenities';

import { regions, rivers, select, populate } from './tours.constants';

export const toursFilters = z
  .object({
    amenities: z.preprocess(toArray, z.array(z.enum(amenities))).catch([]),
    regions: z.preprocess(toArray, z.array(z.enum(regions))).catch([]),
    rivers: z.preprocess(toArray, z.array(z.enum(rivers))).catch([]),
    distanceFrom: z.coerce.number().finite().min(1).catch(1),
    distanceTo: z.coerce.number().finite().min(1).catch(1),
    durationFrom: z.coerce.number().finite().min(1).catch(1),
    durationTo: z.coerce.number().finite().min(1).catch(1),
    daysFrom: z.coerce.number().finite().int().min(1).catch(1),
    daysTo: z.coerce.number().finite().int().min(1).catch(1),
    difficultyFrom: z.coerce.number().finite().min(0).max(5).catch(0),
    difficultyTo: z.coerce.number().finite().min(0).max(5).catch(5),
    user: z.coerce.string(),
    providers: z.preprocess(toArray, z.array(z.coerce.string())).catch([]),
    bounds: z
      .preprocess(
        toArray,
        z.tuple([
          z.coerce.number().finite(),
          z.coerce.number().finite(),
          z.coerce.number().finite(),
          z.coerce.number().finite(),
        ])
      )
      .catch([NaN, NaN, NaN, NaN]),
    select: z.preprocess(toArray, z.array(z.enum(select))).catch([]),
    populate: z.preprocess(toArray, z.array(z.enum(populate))).catch([]),
  })
  .merge(paginationFilters)
  .partial();
