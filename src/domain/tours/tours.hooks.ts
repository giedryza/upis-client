import { routes } from 'config';
import { useQueryParams } from 'tools/services';

export const useToursFilters = () => {
  const filters = useQueryParams(routes.home);

  return filters;
};
