import { FC } from 'react';
import { AppProps } from 'next/app';

import 'styles/index.scss';

import { axe } from 'utils/dev-tools/axe';

axe.init();

const MyApp: FC<AppProps> = ({ Component, pageProps }) => {
  return <Component {...pageProps} />;
};

export default MyApp;
