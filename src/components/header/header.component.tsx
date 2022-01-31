import { FC } from 'react';
import Link from 'next/link';

import Logo from 'components/logo/logo.vector.svg';
import { routes } from 'config/routes';

import styles from './header.module.scss';
import { LanguageSelect } from './language-select/language-select.component';
import { AccountMenu } from './account-menu/account-menu.component';

// import { IconName } from 'ui/icon';
// import { Dropdown } from 'components/dropdown/dropdown.container';
// import { Layout } from 'components/dropdown/parts/layout/layout.container';
// import { DropdownKey } from 'domain/dropdown/dropdown.types';

const Header: FC = () => {
  return (
    <header className={styles.header}>
      <Link href={routes.home}>
        <a className={styles.logo} aria-label="Upis home">
          <Logo focusable={false} aria-hidden />
        </a>
      </Link>
      <nav className={styles.nav}>
        <ul>
          {/* <li>
            <Dropdown
              id={DropdownKey.Test}
              position="bottom-right"
              menuButton={{
                ariaLabel: 'Account menu',
                icon: IconName.ChevronDown,
                variant: 'ghost',
                size: 'lg',
              }}
            >
              <Layout
                id={DropdownKey.Test}
                title="Testing dropdown"
                onSubmit={() => {}}
              >
                <p>
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quo
                  laudantium aut, pariatur esse corporis architecto voluptates
                  vero eveniet ducimus neque.
                </p>
              </Layout>
            </Dropdown>
          </li> */}
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

export { Header };
