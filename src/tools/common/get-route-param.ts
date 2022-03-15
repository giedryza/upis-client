export const getRouteParam = (param: string | string[] | undefined) => {
  if (typeof param !== 'string') {
    return '';
  }

  return param;
};
