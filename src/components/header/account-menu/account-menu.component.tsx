import { VFC } from 'react';
import useTranslation from 'next-translate/useTranslation';
import { useSession, signOut } from 'next-auth/react';

import { routes } from 'config/routes';
import { Button, IconName, DropdownMenu } from 'ui';

const AccountMenu: VFC = () => {
  const { t } = useTranslation();

  const { status } = useSession();

  const signout = () => {
    signOut({ redirect: false });
  };

  return status === 'authenticated' ? (
    <DropdownMenu
      menuButton={{
        label: t('common:account.account'),
        icon: IconName.Account,
        variant: 'ghost',
        size: 'sm',
        withDropdown: true,
      }}
      items={[
        {
          label: t('common:account.profile'),
          icon: IconName.User,
          url: routes.account.profile.index,
        },
        {
          label: t('common:account.signout'),
          icon: IconName.Exit,
          onClick: signout,
        },
      ]}
    />
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
