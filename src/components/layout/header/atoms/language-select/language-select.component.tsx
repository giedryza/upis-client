import { FC } from 'react';
import { useRouter } from 'next/router';
import useTranslation from 'next-translate/useTranslation';

import { CookieName } from 'config';
import { Locale } from 'types/common';
import { capitalize } from 'tools/common';
import { cookies } from 'tools/services';
import { Menu } from 'ui';
import { formatLanguage } from 'tools/format';

export const LanguageSelect: FC = () => {
  const { t } = useTranslation();
  const { push, pathname, query, asPath, locale } = useRouter();

  return (
    <Menu
      ariaLabel={t('common:layout.language.languages')}
      sections={[
        {
          id: 'languages',
          label: t('common:layout.language.languages'),
          items: Object.values(Locale).map((code) => ({
            id: code,
            label: capitalize(formatLanguage(code, code)),
            // TODO: replace with tick
            icon: locale === code ? 'chevron-down' : undefined,
            onClick: () => {
              cookies.set(CookieName.Language, code);
              push({ pathname, query }, asPath, { locale: code });
            },
          })),
        },
      ]}
      icon="globe"
      size="sm"
    />
  );
};
