import { FC, PropsWithChildren } from 'react';
import { clsx } from 'clsx';

import { Props } from './container.types';
import styles from './container.module.scss';

export const Container: FC<PropsWithChildren<Props>> = ({
  children,
  size = 'lg',
  align = 'center',
}) => {
  return (
    <div
      className={clsx(styles.container, styles[size], styles[`align-${align}`])}
    >
      {children}
    </div>
  );
};
