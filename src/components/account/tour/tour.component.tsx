import { VFC } from 'react';

import { About, Details, Actions } from './atoms';
import styles from './tour.module.scss';

export const Tour: VFC = () => {
  return (
    <div className={styles.content}>
      <About />

      <Details />

      <Actions />
    </div>
  );
};
