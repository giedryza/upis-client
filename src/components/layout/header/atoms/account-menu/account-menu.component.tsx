import { FC } from 'react';
import useTranslation from 'next-translate/useTranslation';
import { useSession, signOut } from 'next-auth/react';

import { routes } from 'config';
import { Button, DropdownMenu } from 'ui';
import { generateUrl } from 'tools/services/url';

export const AccountMenu: FC = () => {
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
        as: 'button',
        label: t('common:account.account'),
        icon: 'user',
        variant: 'ghost',
        size: 'sm',
        withDropdown: true,
      }}
      items={[
        {
          as: 'link',
          label: t('common:account.profile'),
          icon: 'user',
          href: generateUrl(routes.account.profile.index),
        },
        {
          as: 'button',
          label: t('common:account.signout'),
          icon: 'exit',
          onClick: signout,
        },
      ]}
    />
  ) : (
    <Button
      as="link"
      label={t('common:account.signin')}
      icon="user"
      variant="ghost"
      size="sm"
      href={generateUrl(routes.auth.signin)}
    />
  );
};
