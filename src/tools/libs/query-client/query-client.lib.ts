import { QueryCache, QueryClientConfig } from 'react-query';

import { handleError } from 'tools/errors';

export const queryClientConfig: QueryClientConfig = {
  defaultOptions: {
    queries: {
      staleTime: 1000 * 0,
      retry: false,
    },
    mutations: {
      onError: (error) => {
        handleError(error);
      },
    },
  },
  queryCache: new QueryCache({
    onError: (error) => {
      handleError(error);
    },
  }),
};
