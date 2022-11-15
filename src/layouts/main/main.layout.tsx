import { FC, PropsWithChildren } from 'react';

import { Footer } from 'components/layout';

import styles from './main.module.scss';

export const MainLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className={styles.container}>
      {children}
      <Footer />
    </div>
  );
};
