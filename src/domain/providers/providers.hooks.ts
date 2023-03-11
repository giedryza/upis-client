import { routes } from 'config';
import { useQueryParams } from 'tools/services';

export const useProvidersFilters = () => {
  const filters = useQueryParams(routes.account.providers.index);

  return filters;
};
