import { useState } from 'react';
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
  DehydratedState,
} from 'react-query';

import { AppProps } from 'types/common/next';
import { reduxStore } from 'tools/libs/store/store.lib';
import { queryClientConfig } from 'tools/libs/query-client';
import { axe } from 'tools/services/axe';
import { AppLayout } from 'components/layouts/app/app.layout';
import { Auth } from 'components/auth/auth.container';

import 'styles/index.scss';

axe.init();

const MyApp = ({
  Component,
  pageProps,
}: AppProps<{ dehydratedState: DehydratedState }>) => {
  const [queryClient] = useState(() => new QueryClient(queryClientConfig));

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <Auth>
          <AppLayout>
            <Component {...pageProps} />
          </AppLayout>
        </Auth>
      </Hydrate>
    </QueryClientProvider>
  );
};

export default reduxStore.wrapper.withRedux(MyApp);
