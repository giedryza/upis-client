import { QueryCache, QueryClientConfig } from 'react-query';

export const queryClientConfig: QueryClientConfig = {
  defaultOptions: {
    queries: {
      staleTime: 1000 * 0,
      retry: false,
    },
    mutations: {
      onError: (error) => {
        console.error(error);
      },
    },
  },
  queryCache: new QueryCache({
    onError: (error) => {
      console.error(error);
    },
  }),
};
