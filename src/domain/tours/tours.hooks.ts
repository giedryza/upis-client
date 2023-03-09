import { useRouter } from 'next/router';

import { routes } from 'config';
import { getParamsSchema } from 'tools/services/url';

export const useToursFilters = () => {
  const { query } = useRouter();

  const filters = getParamsSchema(routes.home).parse(query);

  return filters;
};
