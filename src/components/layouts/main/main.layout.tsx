import { FC } from 'react';

import styles from './main.module.scss';

import { Footer } from 'components/footer/footer.component';

const MainLayout: FC = ({ children }) => {
  return (
    <div className={styles.container}>
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export { MainLayout };
