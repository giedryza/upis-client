import { FC } from 'react';
import useTranslation from 'next-translate/useTranslation';

import { EditPassword } from 'components/account/profile/edit-password/edit-password.component';
import { EditEmail } from 'components/account/profile/edit-email/edit-email.component';

import styles from './profile.module.scss';

const Profile: FC = () => {
  const { t } = useTranslation();

  return (
    <div className={styles.content}>
      <h1>{t('account:profile.title')}</h1>

      <div className={styles.block}>
        <h2>{t('account:profile.subtitle.contact')}</h2>

        <div>
          <EditEmail id="email" />
          <EditPassword id="password" />
        </div>
      </div>
    </div>
  );
};

export { Profile };
