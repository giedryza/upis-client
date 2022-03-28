import { FC } from 'react';
import clsx from 'clsx';

import styles from './container.module.scss';
import { Props } from './container.types';

export const Container: FC<Props> = ({
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
