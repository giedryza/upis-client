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

      <Gallery />

      <Location />

      <Prices />

      <Details />

      <Geography />

      <Amenities />

      <Settings />
    </div>
  );
};
