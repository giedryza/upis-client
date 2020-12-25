import { FC } from 'react';
import { AppProps } from 'next/app';

import 'styles/index.scss';

import { axe } from 'utils/tools/axe';
import { AppLayout } from 'layouts/app/app.layout';
import { ModalProvider } from 'context/modal/modal.context';

axe.init();

const MyApp: FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <ModalProvider>
      <AppLayout>
        <Component {...pageProps} />
      </AppLayout>
    </ModalProvider>
  );
};

export default MyApp;
