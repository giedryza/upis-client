import { FC } from 'react';
import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';
import { useSession, signOut } from 'next-auth/react';

import { routes } from 'config';
import { generateUrl } from 'tools/services';
import { Menu } from 'ui';

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
    <Menu
      ariaLabel={t('common:account.account')}
      sections={[
        {
          id: 'account',
          label: t('common:account.account'),
          items: [
            {
              id: 'profile',
              label: t('common:account.signin'),
              icon: 'user',
              onClick: () => push(generateUrl(routes.auth.signin)),
            },
          ],
        },
        {
          id: 'tour',
          items: [
            {
              id: 'tour',
              label: t('common:header.add_tour'),
              icon: 'path',
              onClick: () => push(generateUrl(routes.account.tours.create)),
            },
          ],
        },
      ]}
      icon="user"
      size="sm"
    />
  );
};
