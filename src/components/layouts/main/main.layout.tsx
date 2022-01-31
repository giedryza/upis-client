import { FC } from 'react';

import { Footer } from 'components/footer/footer.component';

import styles from './main.module.scss';

const MainLayout: FC = ({ children }) => {
  return (
    <div className={styles.container}>
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export { MainLayout };
