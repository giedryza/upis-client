import { FC } from 'react';

import { useActiveTour } from 'domain/tours';

import styles from './header.module.scss';

export const DetailsHeader: FC = () => {
  const { data: tour } = useActiveTour();

  return (
    <header className={styles.header}>
      <h1 className={styles.title}>{tour?.name}</h1>
    </header>
  );
};
