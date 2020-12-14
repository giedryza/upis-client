import { FC } from 'react';
import Link from 'next/link';

import styles from './header.module.scss';

import Logo from 'components/logo/logo.vector.svg';
import { Button } from 'ui/button/button.component';
import { IconName } from 'ui/icon/icon.component';

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
            <Button
              icon={IconName.Globe}
              iconPlacement="top"
              size="xs"
              styleType="ghost"
              label="English"
            />
          </li>
          <li>
            <Button
              icon={IconName.Profile}
              iconPlacement="top"
              size="xs"
              styleType="ghost"
              label="Account"
            />
          </li>
        </ul>
      </nav>
    </header>
  );
};

export { Header };
