import { FC } from 'react';

import { Locale } from 'types/common/locales';

const HOST = process.env.NEXT_PUBLIC_HOST_CLIENT;

interface Props {
  locales?: Locale[];
  defaultLocale: Locale;
  pathname: string;
}

const HreflangTags: FC<Props> = ({ locales = [], defaultLocale, pathname }) => {
  const tags = locales.map((locale) => (
    <link
      rel="alternate"
      hrefLang={locale}
      href={`${HOST}${locale === defaultLocale ? '' : `/${locale}`}${pathname}`}
      key={locale}
    />
  ));

  return (
    <>
      {tags}
      <link rel="alternate" hrefLang="x-default" href={`${HOST}${pathname}`} />
    </>
  );
};

export { HreflangTags };
