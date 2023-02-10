import { FC } from 'react';
import { useRouter } from 'next/router';

import { CookieName } from 'config';
import { Locale } from 'types/common';
import { capitalize } from 'tools/common';
import { cookies } from 'tools/services';
import { IconName, DropdownMenu, DropdownMenuItem } from 'ui';
import { formatLanguage } from 'tools/format';

const iconByLocale: Record<Locale, IconName> = {
  [Locale.Lt]: 'flag-lt',
  [Locale.En]: 'flag-en',
};

export const LanguageSelect: FC = () => {
  const { locale: currentLocale, asPath } = useRouter();

  const items: DropdownMenuItem[] = Object.values(Locale).map((locale) => ({
    label: capitalize(formatLanguage(locale, locale)),
    icon: iconByLocale[locale],
    onClick: () => cookies.set(CookieName.Language, locale),
    url: {
      href: asPath,
      locale,
    },
    attributes: { lang: locale, hrefLang: locale },
  }));

  return (
    <DropdownMenu
      id="language-select"
      position="bottom-right"
      menuButton={{
        label: currentLocale?.toUpperCase(),
        icon: iconByLocale[currentLocale as Locale],
        variant: 'ghost',
        size: 'sm',
      }}
      items={items}
    />
  );
};
