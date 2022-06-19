import { VFC } from 'react';
import clsx from 'clsx';

import { Props } from './divider.types';
import styles from './divider.module.scss';

export const Divider: VFC<Props> = ({ label }) => {
  return (
    <div className={clsx(styles.divider, !label && styles['-empty'])}>
      {label}
    </div>
  );
};
