import { VFC } from 'react';

import { Props } from './info-item.types';
import styles from './info-item.module.scss';

export const InfoItem: VFC<Props> = ({ label, value }) => {
  return (
    <div className={styles.content}>
      <h6 className={styles.title}>{label}</h6>
      <span className={styles.subtitle}>{value}</span>
    </div>
  );
};
