import type { AppProps as NextAppProps } from 'next/app';

export type AppProps<P = any> = {
  pageProps: P;
} & Omit<NextAppProps<P>, 'pageProps'>;
