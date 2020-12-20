import { FC } from 'react';

import styles from './app.module.scss';

import { Header } from 'components/header/header.component';

const AppLayout: FC = ({ children }) => {
  return (
    <div className={styles.container}>
      <Header />
      {children}
    </div>
  );
};

export { AppLayout };
