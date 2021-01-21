import { FC } from 'react';
import clsx from 'clsx';

import styles from './container.module.scss';

interface Props {
  size?: 'xs' | 'sm' | 'md' | 'lg';
}

const Container: FC<Props> = ({ children, size = 'lg' }) => {
  return <div className={clsx(styles.container, styles[size])}>{children}</div>;
};

export { Container };
