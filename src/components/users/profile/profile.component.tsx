import { FC } from 'react';
import useTranslation from 'next-translate/useTranslation';

import styles from './profile.module.scss';

import { EditPassword } from 'components/users/profile/edit-password/edit-password.component';
import { EditEmail } from 'components/users/profile/edit-email/edit-email.component';

const Profile: FC = () => {
  const { t } = useTranslation();

  return (
    <div className={styles.content}>
      <h1>{t('users:profile.title')}</h1>

      <div className={styles.block}>
        <h2>{t('users:profile.subtitle.contact')}</h2>

        <div>
          <EditEmail id="email" />
          <EditPassword id="password" />
        </div>
      </div>
    </div>
  );
};

export { Profile };
