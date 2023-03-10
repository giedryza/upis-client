import { routes } from 'config';
import { useQueryParams } from 'tools/services/url';

export const useToursFilters = () => {
  const filters = useQueryParams(routes.home);

  return filters;
};
