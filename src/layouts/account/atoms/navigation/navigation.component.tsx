import { VFC } from 'react';
import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';
import Link from 'next/link';

import { routes } from 'config/routes';
import { Icon, IconName } from 'ui';

import styles from './navigation.module.scss';

export const Navigation: VFC = () => {
  const { t } = useTranslation();
  const { pathname } = useRouter();

  const links: { label: string; icon: IconName; url: string }[] = [
    {
      label: t('account:profile.title'),
      icon: 'user',
      url: routes.account.profile.index,
    },
    {
      label: t('account:companies.title', { count: 2 }),
      icon: 'kayak',
      url: routes.account.companies.index,
    },
    {
      label: t('account:tours.title', { count: 2 }),
      icon: 'path',
      url: routes.account.tours.index,
    },
  ];

  return (
    <nav className={styles.navigation} aria-label={t('common:account.nav')}>
      <ul className={styles.list}>
        {links.map((link) => (
          <li key={link.label}>
            <Link href={link.url}>
              <a
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
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};
