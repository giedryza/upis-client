import { AppProps } from 'next/app';

import 'styles/index.scss';

import { axe } from 'utils/tools/axe';
import { AppLayout } from 'layouts/app/app.layout';
import { GlobalContext } from 'domain/global.context';
import { Auth } from 'components/auth/auth.container';

axe.init();

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <GlobalContext>
      <Auth>
        <AppLayout>
          <Component {...pageProps} />
        </AppLayout>
      </Auth>
    </GlobalContext>
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

export default MyApp;
