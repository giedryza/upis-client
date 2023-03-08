import { useRouter } from 'next/router';

import { routes } from 'config';
import { getParams } from 'schemas';

export const useToursFilters = () => {
  const { query } = useRouter();

  const filters = getParams(routes.home).parse(query);

  return filters;
};
