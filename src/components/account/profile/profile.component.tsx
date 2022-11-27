import { FC } from 'react';

import { General, Security } from './atoms';
import styles from './profile.module.scss';

export const Profile: FC = () => {
  return (
    <div className={styles.content}>
      <General />

      <Security />
    </div>
  );
};
