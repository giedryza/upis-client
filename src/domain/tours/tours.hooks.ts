import { useRouter } from 'next/router';

import { routes } from 'config';
import { getParameters } from 'schemas';

export const useToursFilters = () => {
  const { query } = useRouter();

  const filters = getParameters(routes.home).parse(query);

  return filters;
};
