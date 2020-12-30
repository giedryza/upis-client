import { FC } from 'react';
import { useRouter } from 'next/router';
import useTranslation from 'next-translate/useTranslation';

import { Locale } from 'types/common/locales';
import { DropdownKey } from 'domain/dropdown/dropdown.types';
import { IconName } from 'ui/icon/icon.types';
import { Dropdown } from 'components/dropdown/dropdown.container';
import { List } from 'ui/dropdown/parts/list/list.component';

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
        ariaLabel: t('common:language.menu'),
        icon: iconByLocale[currentLocale as Locale],
        styleType: 'ghost',
        size: 'lg',
      }}
    >
      <List id={DropdownKey.LanguageSelect} items={items} />
    </Dropdown>
  );
};

export { LanguageSelect };
