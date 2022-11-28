import { FC } from 'react';
import Link from 'next/link';

import Logo from 'components/logo/logo-horizontal.svg';
import { generateRoute } from 'tools/common';
import { routes } from 'config/routes';

import { LanguageSelect, AccountMenu } from './atoms';
import styles from './header.module.scss';

export const Header: FC = () => {
  return (
    <header className={styles.header}>
      <Link
        href={generateRoute(routes.home)}
        className={styles.logo}
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
