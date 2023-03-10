import { z } from 'zod';
import { useRouter } from 'next/router';
import { UrlObject } from 'url';

import { parameters } from './url.schemas';

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

type Params<Url> = Url extends `${string}:${infer Param}/${infer Rest}`
  ? Param | Params<Rest>
  : Url extends `${string}:${infer Param}`
  ? Param
  : never;

export const generateUrl = <Url extends string>(
  url: Url,
  ...[params]: Params<Url> extends never
    ? []
    : [Record<Params<Url>, string | number>]
) => {
  if (!params) return url;

  return Object.entries(params).reduce<string>(
    (acc, [key, value]) => acc.replace(`:${key}`, String(value)),
    url
  );
};
