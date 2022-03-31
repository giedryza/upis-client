import { VFC } from 'react';
import { useRouter } from 'next/router';
import useTranslation from 'next-translate/useTranslation';

import { CookieName } from 'config/cookies';
import { Locale } from 'types/common';
import { cookies } from 'tools/services/cookies';
import { IconName, DropdownMenu, DropdownMenuItem } from 'ui';

const iconByLocale: Record<Locale, IconName> = {
  [Locale.Lt]: 'flag-lt',
  [Locale.En]: 'flag-en',
};

const LanguageSelect: VFC = () => {
  const { locale: currentLocale, asPath } = useRouter();
  const { t } = useTranslation();

  const items: DropdownMenuItem[] = Object.values(Locale).map((locale) => ({
    label: t(`common:language.${locale}`),
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
        label: t(`common:language.${currentLocale}-short`),
        icon: iconByLocale[currentLocale as Locale],
        variant: 'ghost',
        size: 'sm',
      }}
      items={items}
    />
  );
};

export { LanguageSelect };
