import type { AppProps as NextAppProps } from 'next/app';
import { Session } from 'next-auth';
import { DehydratedState } from 'react-query';

interface PageProps {
  dehydratedState: DehydratedState;
  session: Session | null;
}

export type AppProps = {
  pageProps: PageProps;
} & Omit<NextAppProps<PageProps>, 'pageProps'>;
