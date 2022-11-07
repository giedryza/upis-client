import { VFC } from 'react';
import Link from 'next/link';

import Logo from 'components/logo/logo-horizontal.svg';
import { routes } from 'config/routes';

import { LanguageSelect, AccountMenu } from './atoms';
import styles from './header.module.scss';

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
