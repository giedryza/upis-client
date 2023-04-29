import { FC } from 'react';

import { General, Alerts, Security } from './atoms';
import styles from './profile.module.scss';

export const Profile: FC = () => {
  return (
    <div className={styles.content}>
      <Alerts />

      <General />

      <Security />
    </div>
  );
};
