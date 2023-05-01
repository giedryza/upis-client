import { z } from 'zod';

import { routes, PROVIDERS, AMENITIES, TOURS } from 'config';
import { toArray } from 'tools/common';

const utils = {
  query: {},
  route: {
    id: z.object({
      id: z.string().catch(''),
    }),
  },
} as const;

export const paginationFilters = z.object({
  page: z.coerce.number().finite().int().min(1).catch(1),
  limit: z.coerce.number().finite().int().min(1).catch(15),
});

export const providersFilters = z
  .object({
    user: z.string(),
    select: z.preprocess(toArray, z.array(z.enum(PROVIDERS.select))).catch([]),
  })
  .merge(paginationFilters)
  .partial();

export const toursFilters = z
  .object({
    amenities: z
      .preprocess(toArray, z.array(z.enum(AMENITIES.variants)))
      .catch([]),
    regions: z.preprocess(toArray, z.array(z.enum(TOURS.regions))).catch([]),
    rivers: z.preprocess(toArray, z.array(z.enum(TOURS.rivers))).catch([]),
    distanceFrom: z.coerce.number().finite().min(1).catch(1),
    distanceTo: z.coerce.number().finite().min(1).catch(1),
    durationFrom: z.coerce.number().finite().min(1).catch(1),
    durationTo: z.coerce.number().finite().min(1).catch(1),
    daysFrom: z.coerce.number().finite().int().min(1).catch(1),
    daysTo: z.coerce.number().finite().int().min(1).catch(1),
    difficultyFrom: z.coerce.number().finite().min(0).max(5).catch(0),
    difficultyTo: z.coerce.number().finite().min(0).max(5).catch(5),
    user: z.string(),
    providers: z.preprocess(toArray, z.array(z.string())).catch([]),
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
    select: z.preprocess(toArray, z.array(z.enum(TOURS.select))).catch([]),
    populate: z.preprocess(toArray, z.array(z.enum(TOURS.populate))).catch([]),
  })
  .merge(paginationFilters)
  .partial();

export const parameters = {
  query: {
    ...utils.query,
    [routes.home]: z.object({}).merge(toursFilters),
    [routes.account.tours.index]: z.object({}).merge(toursFilters),
    [routes.account.providers.index]: z.object({}).merge(providersFilters),
    [routes.auth.email.verify]: z.object({
      token: z.string().catch(''),
      user: z.string().catch(''),
    }),
  },
  route: {
    ...utils.route,
    [routes.tours.one.index]: z
      .object({
        slug: z.string().catch(''),
      })
      .merge(utils.route.id),
    [routes.account.providers.one.index]: z.object({}).merge(utils.route.id),
    [routes.account.providers.one.amenities.add]: z
      .object({})
      .merge(utils.route.id),
    [routes.account.providers.one.amenities.one]: z
      .object({
        amenityId: z.string().catch(''),
      })
      .merge(utils.route.id),
    [routes.account.providers.one.socials.add]: z
      .object({})
      .merge(utils.route.id),
    [routes.account.providers.one.socials.one]: z
      .object({
        socialId: z.string().catch(''),
      })
      .merge(utils.route.id),
    [routes.account.providers.one.about]: z.object({}).merge(utils.route.id),
    [routes.account.providers.one.contacts]: z.object({}).merge(utils.route.id),
    [routes.account.providers.one.location]: z.object({}).merge(utils.route.id),
    [routes.account.providers.one.logo]: z.object({}).merge(utils.route.id),
    [routes.account.tours.one.index]: z.object({}).merge(utils.route.id),
    [routes.account.tours.one.gallery.one]: z
      .object({
        imageId: z.string().catch(''),
      })
      .merge(utils.route.id),
    [routes.account.tours.one.gallery.add]: z.object({}).merge(utils.route.id),
    [routes.account.tours.one.about]: z.object({}).merge(utils.route.id),
    [routes.account.tours.one.amenities]: z.object({}).merge(utils.route.id),
    [routes.account.tours.one.details]: z.object({}).merge(utils.route.id),
    [routes.account.tours.one.geography]: z.object({}).merge(utils.route.id),
    [routes.account.tours.one.location]: z.object({}).merge(utils.route.id),
    [routes.account.tours.one.prices]: z.object({}).merge(utils.route.id),
  },
};
