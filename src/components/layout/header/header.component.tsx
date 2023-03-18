import { FC } from 'react';
import useTranslation from 'next-translate/useTranslation';

import { AccountMenu, LanguageSelect, HeaderLogo } from './atoms';
import styles from './header.module.scss';

export const Header: FC = () => {
  const { t } = useTranslation();

  return (
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
  );
};
