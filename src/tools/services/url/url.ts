import { z } from 'zod';
import { useRouter } from 'next/router';
import { UrlObject } from 'url';

import { routes } from 'config/routes';
import { toursFilters } from 'domain/tours/tours.schemas';
import { providersFilters } from 'domain/providers/providers.schemas';

const utils = {
  query: {},
  route: {
    id: z.object({
      id: z.coerce.string().catch(''),
    }),
  },
} as const;

const parameters = {
  query: {
    ...utils.query,
    [routes.home]: z.object({}).merge(toursFilters),
    [routes.account.tours.index]: z.object({}).merge(toursFilters),
    [routes.account.providers.index]: z.object({}).merge(providersFilters),
  },
  route: {
    ...utils.route,
    [routes.tours.one.index]: z
      .object({
        slug: z.coerce.string().catch(''),
      })
      .merge(utils.route.id),
    [routes.account.providers.one.index]: z.object({}).merge(utils.route.id),
    [routes.account.providers.one.amenities.add]: z
      .object({})
      .merge(utils.route.id),
    [routes.account.providers.one.amenities.one]: z
      .object({
        amenityId: z.coerce.string().catch(''),
      })
      .merge(utils.route.id),
    [routes.account.providers.one.socials.add]: z
      .object({})
      .merge(utils.route.id),
    [routes.account.providers.one.socials.one]: z
      .object({
        socialId: z.coerce.string().catch(''),
      })
      .merge(utils.route.id),
    [routes.account.providers.one.about]: z.object({}).merge(utils.route.id),
    [routes.account.providers.one.contacts]: z.object({}).merge(utils.route.id),
    [routes.account.providers.one.location]: z.object({}).merge(utils.route.id),
    [routes.account.providers.one.logo]: z.object({}).merge(utils.route.id),
    [routes.account.tours.one.index]: z.object({}).merge(utils.route.id),
    [routes.account.tours.one.gallery.one]: z
      .object({
        imageId: z.coerce.string().catch(''),
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

const getSchema = <
  Location extends keyof typeof parameters,
  Route extends keyof (typeof parameters)[Location]
>(
  location: Location,
  route: Route
): (typeof parameters)[Location][Route] => {
  return parameters[location][route];
};

export const getRouteParams = <Route extends keyof typeof parameters.route>(
  route: Route,
  query: unknown
): z.infer<(typeof parameters.route)[Route]> => {
  const schema = getSchema('route', route);

  return schema.parse(query);
};

export const getQueryParams = <Route extends keyof typeof parameters.query>(
  route: Route,
  query: unknown
): z.infer<(typeof parameters.query)[Route]> => {
  const schema = getSchema('query', route);

  return schema.parse(query);
};

export const useRouteParams = <Route extends keyof typeof parameters.route>(
  route: Route
): z.infer<(typeof parameters.route)[Route]> => {
  const { query } = useRouter();

  return getRouteParams(route, query);
};

export const useQueryParams = <Route extends keyof typeof parameters.query>(
  route: Route
): z.infer<(typeof parameters.query)[Route]> => {
  const { query } = useRouter();

  return getQueryParams(route, query);
};

export const constructUrlWithQuery = <
  Route extends keyof typeof parameters.query,
  Params extends z.infer<(typeof parameters.query)[Route]>
>(
  route: Route,
  getPathname: (route: Route) => string,
  url: {
    query: Params;
  } & Omit<UrlObject, 'pathname' | 'query'>
): UrlObject => {
  return {
    pathname: getPathname(route),
    ...url,
  };
};
