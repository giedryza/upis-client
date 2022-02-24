import { FC } from 'react';
import { useRouter } from 'next/router';
import useTranslation from 'next-translate/useTranslation';

import { CookieName } from 'config/cookies';
import { Locale } from 'types/common/locales';
import { cookies } from 'tools/libs/cookies/cookies.lib';
import { IconName } from 'ui/icon';
import { DropdownMenu, DropdownMenuItem } from 'ui/dropdown-menu';

const iconByLocale: Record<Locale, IconName> = {
  [Locale.Lt]: IconName.FlagLt,
  [Locale.En]: IconName.FlagEn,
};

const LanguageSelect: FC = () => {
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
