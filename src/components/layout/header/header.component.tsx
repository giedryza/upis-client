import { FC } from 'react';
import useTranslation from 'next-translate/useTranslation';

import { SkipLink } from 'ui';

import { AccountMenu, LanguageSelect, HeaderLogo } from './atoms';
import styles from './header.module.scss';

export const Header: FC = () => {
  const { t } = useTranslation();

  return (
    <>
      <SkipLink label={t('common:layout.skip.main')} target="main" />

      <header className={styles.header}>
        <HeaderLogo />

        <nav className={styles.nav} aria-label={t('common:layout.nav.title')}>
          <ul>
            <li>
              <LanguageSelect />
            </li>
            <li>
              <AccountMenu />
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
};
