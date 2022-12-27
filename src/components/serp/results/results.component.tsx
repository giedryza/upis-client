import { FC } from 'react';

import { SerpFilters, SerpList, SerpMap } from 'components/serp';

import styles from './results.module.scss';

export const SerpResults: FC = () => {
  return (
    <div className={styles.container}>
      <SerpFilters />

      <main className={styles.main}>
        <SerpList />
        <SerpMap />
      </main>
    </div>
  );
};
