import { VFC } from 'react';

import { About, Details, Prices, Actions, Geography } from './atoms';
import styles from './tour.module.scss';

export const Tour: VFC = () => {
  return (
    <div className={styles.content}>
      <About />

      <Details />

      <Prices />

      <Geography />

      <Actions />
    </div>
  );
};
