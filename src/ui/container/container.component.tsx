import { FC } from 'react';
import clsx from 'clsx';

import styles from './container.module.scss';
import { Props } from './container.types';

const Container: FC<Props> = ({ children, size = 'lg' }) => {
  return <div className={clsx(styles.container, styles[size])}>{children}</div>;
};

export { Container };
