import { VFC } from 'react';

import { About, Contacts, Location, SocialLinks } from './atoms';
import styles from './company.module.scss';

export const Company: VFC = () => {
  return (
    <div className={styles.content}>
      <About />

      <Contacts />

      <Location />

      <SocialLinks />
    </div>
  );
};
