import { useState } from 'react';
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query';
import { SessionProvider } from 'next-auth/react';
import { SSRProvider } from 'react-aria';

import { AppProps } from 'types/common/next';
import { reduxStore } from 'tools/libs/store/store.lib';
import { queryClientConfig } from 'tools/libs/query-client';
import { axe } from 'tools/services/axe';
import { AppLayout } from 'components/layouts/app/app.layout';

import 'styles/index.scss';

axe.init();

const MyApp = ({ Component, pageProps }: AppProps) => {
  const [queryClient] = useState(() => new QueryClient(queryClientConfig));

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <SessionProvider session={pageProps.session}>
          <SSRProvider>
            <AppLayout>
              <Component {...pageProps} />
            </AppLayout>
          </SSRProvider>
        </SessionProvider>
      </Hydrate>
    </QueryClientProvider>
  );
};

export default reduxStore.wrapper.withRedux(MyApp);
