import { FC } from 'react';

import { Footer } from 'components/layout';

import styles from './main.module.scss';

export const MainLayout: FC = ({ children }) => {
  return (
    <div className={styles.container}>
      {children}
      <Footer />
    </div>
  );
};
