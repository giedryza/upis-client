import { routes } from 'config';
import { useParams } from 'tools/services/url';

export const useToursFilters = () => {
  const filters = useParams(routes.home);

  return filters;
};
