import { useState } from 'react';
import Script from 'next/script';
import { Provider } from 'react-redux';
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { SessionProvider } from 'next-auth/react';
import { SSRProvider, I18nProvider, OverlayProvider } from 'react-aria';

import { APP } from 'config';
import { AppProps } from 'types/common';
import { font, axe, store, queryClientConfig } from 'tools/services';
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
              <OverlayProvider>
                <I18nProvider locale={locale}>
                  <ModalProvider>
                    <AppLayout>
                      {/* Global site tag (gtag.js) - Google Analytics */}
                      <Script
                        src={`https://www.googletagmanager.com/gtag/js?id=${APP.google.measurementId}`}
                        strategy="afterInteractive"
                      />
                      <Script id="google-analytics" strategy="afterInteractive">
                        {`
                          window.dataLayer = window.dataLayer || [];
                          function gtag(){dataLayer.push(arguments);}
                          gtag('js', new Date());
                        
                          gtag('config', '${APP.google.measurementId}');
                        `}
                      </Script>

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
                </I18nProvider>
              </OverlayProvider>
            </SSRProvider>
          </SessionProvider>
        </Hydrate>
      </QueryClientProvider>
    </Provider>
  );
};

export default MyApp;
