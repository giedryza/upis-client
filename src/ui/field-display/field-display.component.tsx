import { VFC } from 'react';

import { isDefined } from 'tools/common';

import { Props } from './field-display.types';
import styles from './field-display.module.scss';

export const FieldDisplay: VFC<Props> = ({ label, value, fallback = '-' }) => {
  return (
    <div className={styles.container}>
      <span className={styles.title}>{label}</span>
      <p className={styles.subtitle}>{isDefined(value) ? value : fallback}</p>
    </div>
  );
};
