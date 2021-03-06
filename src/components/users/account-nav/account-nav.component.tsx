import { FC } from 'react';
import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';

import styles from './account-nav.module.scss';
import { LINKS } from './account-nav.constants';

import { Button } from 'ui/button/button.component';

const AccountNav: FC = () => {
  const { t } = useTranslation();

  const { pathname } = useRouter();

  return (
    <nav className={styles.nav} aria-label={t('users:layout.account-nav')}>
      <ul>
        {LINKS.map((link) => (
          <li key={link.label}>
            <Button
              label={t(link.label)}
              icon={link.icon}
              styleType={pathname === link.url ? 'secondary' : 'ghost-dark'}
              size="sm"
              url={link.url}
              block
              textAlign="left"
            />
          </li>
        ))}
      </ul>
    </nav>
  );
};

export { AccountNav };
