import { VFC } from 'react';

import { Props } from './divider.types';
import styles from './divider.module.scss';

export const Divider: VFC<Props> = ({ label }) => {
  return <div className={styles.divider}>{label}</div>;
};
