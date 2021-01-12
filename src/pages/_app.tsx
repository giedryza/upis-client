import { AppProps } from 'next/app';

import 'styles/index.scss';

import { reduxStore } from 'utils/libs/store/store.lib';
import { axe } from 'utils/tools/axe';
import { AppLayout } from 'components/layouts/app/app.layout';
import { Auth } from 'components/auth/auth.container';

axe.init();

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <Auth>
      <AppLayout>
        <Component {...pageProps} />
      </AppLayout>
    </Auth>
  );
};

export default reduxStore.wrapper.withRedux(MyApp);
