import { FC } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import useTranslation from 'next-translate/useTranslation';

import { APP } from 'config';

import { Props } from './app-head.types';
import { HOST } from './app-head.constants';

export const AppHead: FC<Props> = ({ title }) => {
  const { locales = [], defaultLocale, pathname } = useRouter();
  const { t } = useTranslation();

  return (
    <Head>
      <title>{[APP.name, title].filter(Boolean).join(' | ')}</title>

      <meta name="description" content={t('common:app.description')} />

      <link rel="manifest" href="/manifest.json" />
      <meta name="theme-color" content="#f1f2f4" />
      <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      <meta name="apple-mobile-web-app-status-bar" content="#f1f2f4" />

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
