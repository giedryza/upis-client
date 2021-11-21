import { VFC } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import useTranslation from 'next-translate/useTranslation';

import { Props } from './app-head.types';
import { APP_NAME, HOST } from './app-head.constants';

const AppHead: VFC<Props> = ({ title }) => {
  const { locales = [], defaultLocale, pathname } = useRouter();
  const { t } = useTranslation();

  return (
    <Head>
      <title>{[APP_NAME, title].filter(Boolean).join(' | ')}</title>

      <meta name="description" content={t('common:app.description')} />

      {/* hreflang */}
      {locales.map((locale) => (
        <link
          rel="alternate"
          hrefLang={locale}
          href={`${HOST}${
            locale === defaultLocale ? '' : `/${locale}`
          }${pathname}`}
          key={locale}
        />
      ))}
      <link rel="alternate" hrefLang="x-default" href={`${HOST}${pathname}`} />
    </Head>
  );
};

export { AppHead };
