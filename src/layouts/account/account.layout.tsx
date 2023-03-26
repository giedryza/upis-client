import { FC, PropsWithChildren } from 'react';

import styles from './account.module.scss';

export const AccountLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <main className={styles.main} id="main">
      {children}
    </main>
  );
};
