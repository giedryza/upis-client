import { FC } from 'react';

import { DropdownKey } from 'domain/dropdown/dropdown.types';
import { IconName } from 'ui/icon/icon.types';
import { Dropdown } from 'components/dropdown/dropdown.container';
import { List } from 'components/dropdown/parts/list/list.container';

const AccountMenu: FC = () => {
  return (
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
  );
};

export { AccountMenu };
