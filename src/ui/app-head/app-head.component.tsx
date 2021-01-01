import { FC } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import useTranslation from 'next-translate/useTranslation';

import { isDefined } from 'utils/common/is-defined';

const HOST = process.env.NEXT_PUBLIC_HOST_CLIENT;
const APP_NAME = 'Upis.lt';

interface Props {
  title?: string;
}

const AppHead: FC<Props> = ({ title }) => {
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

  const appTitle = [APP_NAME, title, description].filter(isDefined).join(' | ');

  return (
    <Head>
      <title>{appTitle}</title>
      {hreflangTags}
      <link rel="alternate" hrefLang="x-default" href={`${HOST}${pathname}`} />
    </Head>
  );
};

export { AppHead };
