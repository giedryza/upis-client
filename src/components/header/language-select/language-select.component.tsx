import { FC } from 'react';
import { useRouter } from 'next/router';
import useTranslation from 'next-translate/useTranslation';

import { Locale } from 'types/common/locales';
import { DropdownKey } from 'domain/dropdown/dropdown.types';
import { IconName } from 'ui/icon/icon.types';
import { Dropdown } from 'components/dropdown/dropdown.container';
import { List } from 'components/dropdown/list/list.container';
import { cookies } from 'uri/cookies.lib';
import { CookieName } from 'utils/libs/cookies/cookies';

const iconByLocale: Record<Locale, IconName> = {
  [Locale.Lt]: IconName.FlagLt,
  [Locale.En]: IconName.FlagEn,
};

const LanguageSelect: FC = () => {
  const { locale: currentLocale, asPath } = useRouter();
  const { t } = useTranslation();

  const items = Object.values(Locale).map((locale) => ({
    label: t(`common:language.${locale}`),
    icon: iconByLocale[locale],
    onClick: () => cookies.set(CookieName.Language, locale),
    url: {
      href: asPath,
      locale,
    },
  }));

  return (
    <Dropdown
      id={DropdownKey.LanguageSelect}
      position="bottom-right"
      menuButton={{
        label: t(`common:language.${currentLocale}-short`),
        icon: iconByLocale[currentLocale as Locale],
        styleType: 'ghost',
      }}
    >
      <List id={DropdownKey.LanguageSelect} items={items} />
    </Dropdown>
  );
};

export { LanguageSelect };
