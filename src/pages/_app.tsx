import { useState } from 'react';
import { Provider } from 'react-redux';
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query';
import { SessionProvider } from 'next-auth/react';
import { SSRProvider } from 'react-aria';

import { AppProps } from 'types/common';
import { queryClientConfig } from 'tools/libs/query-client';
import { store } from 'tools/libs/store';
import { axe } from 'tools/services/axe';
import { AppLayout } from 'layouts';
import { Notifications } from 'components/notifications';

import 'styles/index.scss';

axe.init();

const MyApp = ({ Component, pageProps }: AppProps) => {
  const [queryClient] = useState(() => new QueryClient(queryClientConfig));

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <SessionProvider session={pageProps.session}>
            <SSRProvider>
              <AppLayout>
                <Component {...pageProps} />

                <Notifications />
              </AppLayout>
            </SSRProvider>
          </SessionProvider>
        </Hydrate>
      </QueryClientProvider>
    </Provider>
  );
};

export default MyApp;
