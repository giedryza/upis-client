import { FC } from 'react';

import { Props } from './info-item.types';
import styles from './info-item.module.scss';

export const InfoItem: FC<Props> = ({ label, value }) => {
  return (
    <div className={styles.content}>
      <div className={styles.title}>{label}</div>
      <div className={styles.subtitle}>{value}</div>
    </div>
  );
};
