import { FC } from 'react';
import useTranslation from 'next-translate/useTranslation';
import { useSession, signOut } from 'next-auth/react';

import { routes } from 'config/routes';
import { IconName } from 'ui/icon';
import { Button } from 'ui/button';
import { DropdownMenu } from 'ui/dropdown-menu';

const AccountMenu: FC = () => {
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
          url: routes.users.profile,
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
