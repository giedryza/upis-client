import { FC } from 'react';
import Link from 'next/link';

import styles from './header.module.scss';
import { LanguageSelect } from './parts/language-select/language-select.component';

import Logo from 'components/logo/logo.vector.svg';
import { IconName } from 'ui/icon/icon.component';
import { Dropdown } from 'components/dropdown/dropdown.container';
import { Layout } from 'components/dropdown/parts/layout/layout.container';
import { List } from 'ui/dropdown/parts/list/list.component';
import { DropdownKey } from 'domain/dropdown/dropdown.types';

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
              id={DropdownKey.Test}
              position="bottom-right"
              menuButton={{
                ariaLabel: 'Account menu',
                icon: IconName.ChevronDown,
                styleType: 'ghost',
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
                <p>
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quo
                  laudantium aut, pariatur esse corporis architecto voluptates
                  vero eveniet ducimus neque.
                </p>
                <p>
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quo
                  laudantium aut, pariatur esse corporis architecto voluptates
                  vero eveniet ducimus neque.
                </p>
                <p>
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quo
                  laudantium aut, pariatur esse corporis architecto voluptates
                  vero eveniet ducimus neque.
                </p>
              </Layout>
            </Dropdown>
          </li>
          <li>
            <LanguageSelect />
          </li>
          <li>
            <Dropdown
              id={DropdownKey.AccountMenu}
              position="bottom-right"
              menuButton={{
                ariaLabel: 'Account menu',
                icon: IconName.Account,
                styleType: 'ghost',
                size: 'lg',
              }}
            >
              <List
                id={DropdownKey.AccountMenu}
                items={[
                  {
                    label: 'View profile',
                    icon: IconName.User,
                    url: '/users/signin',
                  },
                  {
                    label: 'Sign out',
                    icon: IconName.Exit,
                    onClick: () => {},
                  },
                ]}
              />
            </Dropdown>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export { Header };
