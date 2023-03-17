import { FC } from 'react';
import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';
import { useSession, signOut } from 'next-auth/react';

import { routes } from 'config';
import { Button, Menu } from 'ui';
import { generateUrl } from 'tools/services';

export const AccountMenu: FC = () => {
  const { t } = useTranslation();
  const { push } = useRouter();

  const { status } = useSession();

  const signout = () => {
    signOut({ redirect: false });
  };

  return status === 'authenticated' ? (
    <Menu
      ariaLabel={t('common:account.account')}
      sections={[
        {
          id: 'account',
          label: t('common:account.account'),
          items: [
            {
              id: 'profile',
              label: t('common:account.profile'),
              icon: 'user',
              onClick: () => push(generateUrl(routes.account.profile.index)),
            },
            {
              id: 'providers',
              label: t('common:account.providers'),
              icon: 'kayak',
              onClick: () => push(generateUrl(routes.account.providers.index)),
            },
            {
              id: 'tours',
              label: t('common:account.tours'),
              icon: 'path',
              onClick: () => push(generateUrl(routes.account.tours.index)),
            },
          ],
        },
        {
          id: 'signout',
          items: [
            {
              id: 'signout',
              label: t('common:account.signout'),
              icon: 'exit',
              onClick: signout,
            },
          ],
        },
      ]}
      icon="user"
      size="sm"
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
