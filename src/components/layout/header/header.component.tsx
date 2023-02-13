import { FC } from 'react';
import useTranslation from 'next-translate/useTranslation';

import { AddTour, AccountMenu, LanguageSelect, Logo } from './atoms';
import styles from './header.module.scss';

export const Header: FC = () => {
  const { t } = useTranslation();

  return (
    <header className={styles.header}>
      <Logo />

      <nav className={styles.nav} aria-label={t('common:header.nav')}>
        <ul>
          <li>
            <AddTour />
          </li>
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
