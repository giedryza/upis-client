import { FC, PropsWithChildren } from 'react';

import { Navigation } from './atoms';
import styles from './account.module.scss';

export const AccountLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className={styles.layout}>
      <aside className={styles.sidebar}>
        <Navigation />
      </aside>
      <main className={styles.main}>{children}</main>
    </div>
  );
};
