type Params<Route> = Route extends `${string}:${infer Param}/${infer Rest}`
  ? Param | Params<Rest>
  : Route extends `${string}:${infer Param}`
  ? Param
  : never;

export const generateRoute = <Route extends string>(
  url: Route,
  ...[params]: Params<Route> extends never
    ? []
    : [Record<Params<Route>, string | number>]
) => {
  if (!params) return url;

  return Object.entries(params).reduce<string>(
    (acc, [key, value]) => acc.replace(`:${key}`, String(value)),
    url
  );
};
