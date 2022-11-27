import { FC } from 'react';

import {
  About,
  Contacts,
  Location,
  Logo,
  SocialLinks,
  Settings,
  Amenities,
} from './atoms';
import styles from './provider.module.scss';

export const Provider: FC = () => {
  return (
    <div className={styles.content}>
      <About />

      <Logo />

      <Contacts />

      <Location />

      <Amenities />

      <SocialLinks />

      <Settings />
    </div>
  );
};
