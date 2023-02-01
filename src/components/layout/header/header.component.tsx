import { FC } from 'react';

import { AddTour, AccountMenu, LanguageSelect, Logo } from './atoms';
import styles from './header.module.scss';

export const Header: FC = () => {
  return (
    <header className={styles.header}>
      <Logo />

      <nav className={styles.nav}>
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
