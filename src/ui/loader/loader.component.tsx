import { forwardRef } from 'react';
import { clsx } from 'clsx';

import { Props } from './loader.types';
import styles from './loader.module.scss';

export const Loader = forwardRef<HTMLDivElement, Props>(
  ({ width, height, radius = 'none' }, ref) => {
    return (
      <div
        className={clsx(styles.loader, styles[`-radius-${radius}`])}
        style={{ width, height }}
        ref={ref}
      />
    );
  }
);

Loader.displayName = 'Loader';
