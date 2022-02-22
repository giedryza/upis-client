import { FC } from 'react';
import useTranslation from 'next-translate/useTranslation';
import { useSession, signOut } from 'next-auth/react';

import { DropdownKey } from 'domain/dropdown/dropdown.types';
import { IconName } from 'ui/icon';
import { Dropdown } from 'components/dropdown/dropdown.container';
import { List } from 'components/dropdown/list/list.container';
import { Button } from 'ui/button';
import { routes } from 'config/routes';

const AccountMenu: FC = () => {
  const { t } = useTranslation();

  const { status } = useSession();

  const signout = () => {
    signOut({ redirect: false });
  };

  return status === 'authenticated' ? (
    <Dropdown
      id={DropdownKey.AccountMenu}
      position="bottom-right"
      menuButton={{
        label: t('common:account.account'),
        icon: IconName.Account,
        variant: 'ghost',
        size: 'sm',
        withDropdown: true,
      }}
    >
      <List
        id={DropdownKey.AccountMenu}
        items={[
          {
            label: t('common:account.profile'),
            icon: IconName.User,
            url: routes.users.profile,
          },
          {
            label: t('common:account.signout'),
            icon: IconName.Exit,
            onClick: signout,
          },
        ]}
      />
    </Dropdown>
  ) : (
    <Button
      label={t('common:account.signin')}
      icon={IconName.Account}
      variant="ghost"
      size="sm"
      url={routes.auth.signin}
    />
  );
};

export { AccountMenu };
