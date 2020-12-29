import { FC } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

import { HreflangTags } from './parts/hreflang-tags/hreflang-tags.component';
import { Title } from './parts/title/title.component';

import { Locale } from 'types/common/locales';

interface Props {
  title?: string;
}

const AppHead: FC<Props> = ({ title }) => {
  const { locales, defaultLocale, pathname } = useRouter();

  return (
    <Head>
      <Title title={title} />
      <HreflangTags
        locales={locales as Locale[]}
        defaultLocale={defaultLocale as Locale}
        pathname={pathname}
      />
    </Head>
  );
};

export { AppHead };
