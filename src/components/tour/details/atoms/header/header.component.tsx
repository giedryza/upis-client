import { FC } from 'react';

import styles from './header.module.scss';

export const DetailsHeader: FC = () => {
  return (
    <header className={styles.header}>
      <h1 className={styles.title}>Aukštaitijos upėmis ir skardžiais</h1>
    </header>
  );
};
