import { FC } from 'react';
import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';

import { routes } from 'config';
import { generateUrl } from 'tools/services';
import { Menu } from 'ui';
import { useConfirm } from 'domain/confirm';
import { useSignout, useUpdateRole } from 'domain/users';
import { useFavoritesContext } from 'domain/favorites';

export const AccountMenu: FC = () => {
  const { t } = useTranslation();
  const { push } = useRouter();
  const { confirmation } = useConfirm();

  const { favorites } = useFavoritesContext();

  const { data: session, status, update } = useSession();
  const { mutate: updateRole, isLoading: isUpdateRoleLoading } =
    useUpdateRole();
  const { mutate: signout, isLoading: isSignoutLoading } = useSignout();

  return (
    <Menu
      ariaLabel={t('common:layout.menu.account')}
      sections={
        status !== 'authenticated'
          ? [
              {
                id: 'account',
                label: t('common:layout.menu.account'),
                items: [
                  {
                    id: 'profile',
                    label: t('common:layout.menu.signin'),
                    icon: 'user',
                    onClick: () => push(generateUrl(routes.auth.signin)),
                  },
                  {
                    id: 'favorites',
                    label: t('common:layout.menu.favorites'),
                    icon: 'heart',
                    disabled: !favorites.length,
                    onClick: () =>
                      push({
                        pathname: generateUrl(routes.home),
                        query: { ids: favorites },
                      }),
                  },
                ],
              },
            ]
          : session.user.role === 'user'
          ? [
              {
                id: 'account',
                label: t('common:layout.menu.account'),
                items: [
                  {
                    id: 'profile',
                    label: t('common:layout.menu.profile'),
                    icon: 'user',
                    onClick: () =>
                      push(generateUrl(routes.account.profile.index)),
                  },
                  {
                    id: 'favorites',
                    label: t('common:layout.menu.favorites'),
                    icon: 'heart',
                    disabled: !favorites.length,
                    onClick: () =>
                      push({
                        pathname: generateUrl(routes.home),
                        query: { ids: favorites },
                      }),
                  },
                  {
                    id: 'become_provider',
                    label: t('common:layout.become_provider.action'),
                    icon: 'kayak',
                    disabled: isUpdateRoleLoading,
                    onClick: async () => {
                      const { confirmed } = await confirmation(
                        t('common:layout.become_provider.prompt'),
                        t('common:layout.become_provider.title')
                      );

                      if (confirmed) {
                        updateRole(undefined, {
                          onSuccess: async ({ data }) => {
                            await update({
                              user: data.user,
                              token: data.token,
                            });
                            push(generateUrl(routes.account.providers.index));
                          },
                        });
                      }
                    },
                  },
                ],
              },
              {
                id: 'signout',
                items: [
                  {
                    id: 'signout',
                    label: t('common:layout.menu.signout'),
                    icon: 'exit',
                    disabled: isSignoutLoading,
                    onClick: signout,
                  },
                ],
              },
            ]
          : session.user.role === 'pending'
          ? [
              {
                id: 'account',
                label: t('common:layout.menu.account'),
                items: [
                  {
                    id: 'profile',
                    label: t('common:layout.menu.profile'),
                    icon: 'user',
                    onClick: () =>
                      push(generateUrl(routes.account.profile.index)),
                  },
                  {
                    id: 'favorites',
                    label: t('common:layout.menu.favorites'),
                    icon: 'heart',
                    disabled: !favorites.length,
                    onClick: () =>
                      push({
                        pathname: generateUrl(routes.home),
                        query: { ids: favorites },
                      }),
                  },
                ],
              },
              {
                id: 'signout',
                items: [
                  {
                    id: 'signout',
                    label: t('common:layout.menu.signout'),
                    icon: 'exit',
                    disabled: isSignoutLoading,
                    onClick: signout,
                  },
                ],
              },
            ]
          : session.user.role === 'manager'
          ? [
              {
                id: 'account',
                label: t('common:layout.menu.account'),
                items: [
                  {
                    id: 'profile',
                    label: t('common:layout.menu.profile'),
                    icon: 'user',
                    onClick: () =>
                      push(generateUrl(routes.account.profile.index)),
                  },
                  {
                    id: 'favorites',
                    label: t('common:layout.menu.favorites'),
                    icon: 'heart',
                    disabled: !favorites.length,
                    onClick: () =>
                      push({
                        pathname: generateUrl(routes.home),
                        query: { ids: favorites },
                      }),
                  },
                  {
                    id: 'providers',
                    label: t('common:layout.menu.providers'),
                    icon: 'kayak',
                    onClick: () =>
                      push(generateUrl(routes.account.providers.index)),
                  },
                  {
                    id: 'tours',
                    label: t('common:layout.menu.tours'),
                    icon: 'path',
                    onClick: () =>
                      push(generateUrl(routes.account.tours.index)),
                  },
                ],
              },
              {
                id: 'signout',
                items: [
                  {
                    id: 'signout',
                    label: t('common:layout.menu.signout'),
                    icon: 'exit',
                    disabled: isSignoutLoading,
                    onClick: signout,
                  },
                ],
              },
            ]
          : session.user.role === 'admin'
          ? [
              {
                id: 'account',
                label: t('common:layout.menu.account'),
                items: [
                  {
                    id: 'profile',
                    label: t('common:layout.menu.profile'),
                    icon: 'user',
                    onClick: () =>
                      push(generateUrl(routes.account.profile.index)),
                  },
                  {
                    id: 'favorites',
                    label: t('common:layout.menu.favorites'),
                    icon: 'heart',
                    disabled: !favorites.length,
                    onClick: () =>
                      push({
                        pathname: generateUrl(routes.home),
                        query: { ids: favorites },
                      }),
                  },
                  {
                    id: 'providers',
                    label: t('common:layout.menu.providers'),
                    icon: 'kayak',
                    onClick: () =>
                      push(generateUrl(routes.account.providers.index)),
                  },
                  {
                    id: 'tours',
                    label: t('common:layout.menu.tours'),
                    icon: 'path',
                    onClick: () =>
                      push(generateUrl(routes.account.tours.index)),
                  },
                ],
              },
              {
                id: 'signout',
                items: [
                  {
                    id: 'signout',
                    label: t('common:layout.menu.signout'),
                    icon: 'exit',
                    disabled: isSignoutLoading,
                    onClick: signout,
                  },
                ],
              },
            ]
          : []
      }
      icon="user"
      size="sm"
    />
  );
};
