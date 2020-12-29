import { AppProps } from 'next/app';

import 'styles/index.scss';

import { axe } from 'utils/tools/axe';
import { AppLayout } from 'layouts/app/app.layout';
import { GlobalContext } from 'state/global.context';

axe.init();

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <GlobalContext>
      <AppLayout>
        <Component {...pageProps} />
      </AppLayout>
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
