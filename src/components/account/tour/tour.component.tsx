import { FC } from 'react';

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

export const Tour: FC = () => {
  return (
    <div className={styles.content}>
      <About />

      <Gallery />

      <Location />

      <Geography />

      <Details />

      <Prices />

      <Amenities />

      <Settings />
    </div>
  );
};
