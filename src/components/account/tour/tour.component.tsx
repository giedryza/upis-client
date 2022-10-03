import { VFC } from 'react';

import {
  About,
  Details,
  Prices,
  Actions,
  Geography,
  Amenities,
  Location,
} from './atoms';
import styles from './tour.module.scss';

export const Tour: VFC = () => {
  return (
    <div className={styles.content}>
      <About />

      <Details />

      <Prices />

      <Location />

      <Geography />

      <Amenities />

      <Actions />
    </div>
  );
};
