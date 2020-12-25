import { FC } from 'react';
import { AppProps } from 'next/app';

import 'styles/index.scss';

import { axe } from 'utils/tools/axe';
import { AppLayout } from 'layouts/app/app.layout';
import { GlobalContext } from 'state/global.context';

axe.init();

const MyApp: FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <GlobalContext>
      <AppLayout>
        <Component {...pageProps} />
      </AppLayout>
    </GlobalContext>
  );
};

export default MyApp;
