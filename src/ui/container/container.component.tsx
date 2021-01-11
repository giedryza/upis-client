import { FC } from 'react';

import styles from './container.module.scss';

const Container: FC = ({ children }) => {
  return <div className={styles.container}>{children}</div>;
};

export { Container };
