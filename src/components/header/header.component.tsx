import { FC } from 'react';
import Link from 'next/link';

import styles from './header.module.scss';

import Logo from 'components/logo/logo.vector.svg';
import { IconName } from 'ui/icon/icon.component';
import { Dropdown } from 'ui/dropdown/dropdown.component';

interface Props {}

const Header: FC<Props> = () => {
  return (
    <header className={styles.header}>
      <Link href="/">
        <a className={styles.logo} aria-label="Upis home">
          <Logo focusable={false} aria-hidden />
        </a>
      </Link>
      <nav className={styles.nav}>
        <ul>
          <li>
            <Dropdown
              position="bottom-right"
              menuButton={{
                ariaLabel: 'Language menu',
                icon: IconName.Globe,
                styleType: 'ghost',
                size: 'lg',
              }}
              items={[
                {
                  label: 'English',
                  icon: IconName.FlagEn,
                  url: '/en',
                },
                {
                  label: 'Lietuvių',
                  icon: IconName.FlagLt,
                  url: '/lt',
                },
              ]}
            />
          </li>
          <li>
            <Dropdown
              position="bottom-right"
              menuButton={{
                ariaLabel: 'Account menu',
                icon: IconName.Account,
                styleType: 'ghost',
                size: 'lg',
              }}
              items={[
                {
                  label: 'View profile',
                  icon: IconName.User,
                  url: '/profile',
                },
                {
                  label: 'Sign out',
                  icon: IconName.Exit,
                  onClick: () => {},
                },
              ]}
            />
          </li>
        </ul>
      </nav>
    </header>
  );
};

export { Header };
