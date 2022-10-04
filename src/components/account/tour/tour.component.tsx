import { VFC } from 'react';

import {
  About,
  Details,
  Prices,
  Settings,
  Geography,
  Amenities,
  Location,
  Gallery,
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

      <Gallery />

      <Amenities />

      <Settings />
    </div>
  );
};
