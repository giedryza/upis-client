import { VFC } from 'react';

import { About, Details } from './atoms';
import { TourActions } from './atoms/actions';
import styles from './tour.module.scss';

export const Tour: VFC = () => {
  return (
    <div className={styles.content}>
      <About />

      <Details />

      <TourActions />
    </div>
  );
};
