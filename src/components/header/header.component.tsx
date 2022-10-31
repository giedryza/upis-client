import { VFC } from 'react';
import Link from 'next/link';

import Logo from 'components/logo/logo-horizontal.svg';
import { routes } from 'config/routes';

import styles from './header.module.scss';
import { LanguageSelect } from './language-select/language-select.component';
import { AccountMenu } from './account-menu/account-menu.component';

export const Header: VFC = () => {
  return (
    <header className={styles.header}>
      <Link
        href={routes.home}
        className={styles.logo}
        legacyBehavior={false}
        aria-label="Home"
      >
        <Logo focusable={false} aria-hidden />
      </Link>
      <nav className={styles.nav}>
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
