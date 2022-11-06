import { FC } from 'react';

import { SerpList, SerpMap } from 'components/serp';

import styles from './results.module.scss';

export const SerpResults: FC = () => {
  return (
    <div className={styles.container}>
      <SerpList />
      <SerpMap />
    </div>
  );
};
