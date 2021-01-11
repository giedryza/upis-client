import { FC } from 'react';
import useTranslation from 'next-translate/useTranslation';

import styles from './profile.module.scss';

const Profile: FC = () => {
  const { t } = useTranslation();

  return (
    <div className={styles.content}>
      <h1>{t('users:profile.title')}</h1>
    </div>
  );
};

export { Profile };
