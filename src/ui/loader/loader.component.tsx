import { FC } from 'react';
import { clsx } from 'clsx';

import { Props } from './loader.types';
import styles from './loader.module.scss';

export const Loader: FC<Props> = ({ width, height, radius = 'none' }) => {
  return (
    <div
      className={clsx(styles.loader, styles[`-radius-${radius}`])}
      style={{ width, height }}
    />
  );
};
