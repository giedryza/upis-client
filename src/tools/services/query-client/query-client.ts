import { QueryCache, QueryClientConfig } from '@tanstack/react-query';

import { handleErrors } from 'tools/errors';

export const queryClientConfig: QueryClientConfig = {
  defaultOptions: {
    queries: {
      staleTime: 1000 * 0,
      retry: false,
    },
    mutations: {
      onError: (error) => {
        handleErrors(error);
      },
    },
  },
  queryCache: new QueryCache({
    onError: (error) => {
      handleErrors(error);
    },
  }),
};
