import { FC } from 'react';
import { clsx } from 'clsx';

import { Props } from './divider.types';
import styles from './divider.module.scss';

export const Divider: FC<Props> = ({ label }) => {
  return (
    <div className={clsx(styles.divider, !label && styles['-empty'])}>
      {label}
    </div>
  );
};
