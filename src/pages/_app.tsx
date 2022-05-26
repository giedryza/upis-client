import { useState } from 'react';
import { Provider } from 'react-redux';
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query';
import { SessionProvider } from 'next-auth/react';
import { SSRProvider } from 'react-aria';

import { AppProps } from 'types/common';
import { queryClientConfig } from 'tools/services/query-client';
import { store } from 'tools/services/store';
import { axe } from 'tools/services/a11y';
import { Modal } from 'ui';
import { AppLayout } from 'layouts';
import { Alerts } from 'components/alerts';
import { ModalSlot } from 'components/modal-slot';
import { ConfirmationModal } from 'components/modals';

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
              <Modal.Provider>
                <AppLayout>
                  <Component {...pageProps} />

                  <Alerts />
                  <ModalSlot
                    modalName="confirmation"
                    slot={<ConfirmationModal />}
                  />
                </AppLayout>
              </Modal.Provider>
            </SSRProvider>
          </SessionProvider>
        </Hydrate>
      </QueryClientProvider>
    </Provider>
  );
};

export default MyApp;
