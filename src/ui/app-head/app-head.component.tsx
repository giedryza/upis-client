import { VFC } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import useTranslation from 'next-translate/useTranslation';

import { Props } from './app-head.types';
import { APP_NAME, HOST } from './app-head.constants';

import { isDefined } from 'utils/common/is-defined';

const AppHead: VFC<Props> = ({ title }) => {
  const { locales = [], defaultLocale, pathname } = useRouter();
  const { t } = useTranslation();

  const hreflangTags = locales.map((locale) => (
    <link
      rel="alternate"
      hrefLang={locale}
      href={`${HOST}${locale === defaultLocale ? '' : `/${locale}`}${pathname}`}
      key={locale}
    />
  ));

  const description = t('common:app.description');

  const appTitle = [APP_NAME, title].filter(isDefined).join(' | ');

  return (
    <Head>
      <title>{appTitle}</title>
      <meta name="description" content={description} />
      {hreflangTags}
      <link rel="alternate" hrefLang="x-default" href={`${HOST}${pathname}`} />
    </Head>
  );
};

export { AppHead };
