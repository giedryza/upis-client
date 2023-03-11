import { FC } from 'react';
import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';
import Link from 'next/link';

import { routes } from 'config';
import { generateUrl } from 'tools/services';
import { Icon, IconName } from 'ui';

import styles from './navigation.module.scss';

export const Navigation: FC = () => {
  const { t } = useTranslation();
  const { pathname } = useRouter();

  const links: { label: string; icon: IconName; url: string }[] = [
    {
      label: t('account:profile.title'),
      icon: 'user',
      url: generateUrl(routes.account.profile.index),
    },
    {
      label: t('account:providers.title', { count: 2 }),
      icon: 'kayak',
      url: generateUrl(routes.account.providers.index),
    },
    {
      label: t('account:tours.title', { count: 2 }),
      icon: 'path',
      url: generateUrl(routes.account.tours.index),
    },
  ];

  return (
    <nav className={styles.navigation} aria-label={t('common:account.nav')}>
      <ul className={styles.list}>
        {links.map((link) => (
          <li key={link.label}>
            <Link
              href={link.url}
              className={styles.link}
              {...(pathname.includes(link.url) && { 'aria-current': 'page' })}
            >
              <Icon
                name={link.icon}
                className={styles.icon}
                focusable={false}
                aria-hidden
              />
              <span>{link.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};
