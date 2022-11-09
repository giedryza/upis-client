import { VFC } from 'react';
import useTranslation from 'next-translate/useTranslation';
import { useSession, signOut } from 'next-auth/react';

import { routes } from 'config/routes';
import { Button, DropdownMenu } from 'ui';

export const AccountMenu: VFC = () => {
  const { t } = useTranslation();

  const { status } = useSession();

  const signout = () => {
    signOut({ redirect: false });
  };

  return status === 'authenticated' ? (
    <DropdownMenu
      id="account-menu"
      position="bottom-right"
      menuButton={{
        label: t('common:account.account'),
        icon: 'user',
        variant: 'ghost',
        size: 'sm',
        withDropdown: true,
      }}
      items={[
        {
          label: t('common:account.profile'),
          icon: 'user',
          url: routes.account.profile.index,
        },
        {
          label: t('common:account.signout'),
          icon: 'exit',
          onClick: signout,
        },
      ]}
    />
  ) : (
    <Button
      label={t('common:account.signin')}
      icon="user"
      variant="ghost"
      size="sm"
      url={routes.auth.signin}
    />
  );
};
