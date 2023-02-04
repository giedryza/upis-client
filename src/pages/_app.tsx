import { useState } from 'react';
import { Provider } from 'react-redux';
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { SessionProvider } from 'next-auth/react';
import { SSRProvider, I18nProvider } from 'react-aria';

import { AppProps } from 'types/common';
import { queryClientConfig } from 'tools/services/query-client';
import { store } from 'tools/services/store';
import { axe } from 'tools/services/a11y';
import { font } from 'tools/services/font';
import { Modal } from 'ui';
import { AppLayout } from 'layouts';
import { ProgressBar } from 'components/layout';
import { Alerts } from 'components/alerts';
import { LightboxOutlet } from 'components/lightbox-outlet';
import { ModalProvider } from 'domain/modal';

import 'styles/index.scss';

axe.init();

const MyApp = ({ Component, pageProps }: AppProps) => {
  const [queryClient] = useState(() => new QueryClient(queryClientConfig));
  const { locale } = useRouter();

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <SessionProvider session={pageProps.session}>
            <SSRProvider>
              <I18nProvider locale={locale}>
                <Modal.OverlayProvider>
                  <ModalProvider>
                    <AppLayout>
                      <style jsx global>{`
                        html {
                          font-family: ${font.style.fontFamily};
                        }
                      `}</style>

                      <Component {...pageProps} />

                      <ProgressBar />
                      <Alerts />

                      <LightboxOutlet />
                    </AppLayout>
                  </ModalProvider>
                </Modal.OverlayProvider>
              </I18nProvider>
            </SSRProvider>
          </SessionProvider>
        </Hydrate>
      </QueryClientProvider>
    </Provider>
  );
};

export default MyApp;
