import { AppProps } from 'next/app';

import 'styles/index.scss';

import { store } from 'utils/libs/store/store.lib';
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

// MyApp.getInitialProps = async ({ Component, ctx }: AppContext) => {
//   const { data } = await http(uri.endpoints.users.me, {
//     req: ctx.req,
//   });

//   const pageProps = Component.getInitialProps
//     ? await Component.getInitialProps(ctx)
//     : {};

//   return {
//     pageProps,
//     user: data.user,
//   };
// };

export default store.wrapper.withRedux(MyApp);
