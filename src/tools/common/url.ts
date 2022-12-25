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
