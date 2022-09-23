import { VFC } from 'react';
import { useRouter } from 'next/router';

import { CookieName } from 'config/cookies';
import { Locale } from 'types/common';
import { capitalize } from 'tools/common';
import { cookies } from 'tools/services/cookies';
import { IconName, DropdownMenu, DropdownMenuItem } from 'ui';

const iconByLocale: Record<Locale, IconName> = {
  [Locale.Lt]: 'flag-lt',
  [Locale.En]: 'flag-en',
};

export const LanguageSelect: VFC = () => {
  const { locale: currentLocale, asPath } = useRouter();

  const items: DropdownMenuItem[] = Object.values(Locale).map((locale) => ({
    label: capitalize(
      new Intl.DisplayNames(locale, { type: 'language' }).of(locale)
    ),
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
