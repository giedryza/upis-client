import { FC } from 'react';
import { AppProps } from 'next/app';

import 'styles/index.scss';

import { axe } from 'utils/tools/axe';
import { AppLayout } from 'layouts/app/app.layout';

axe.init();

const MyApp: FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <AppLayout>
      <Component {...pageProps} />
    </AppLayout>
  );
};

export default MyApp;
