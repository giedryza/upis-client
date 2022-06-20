import { VFC } from 'react';

import {
  About,
  Contacts,
  Location,
  Logo,
  SocialLinks,
  CompanyActions,
} from './atoms';
import styles from './company.module.scss';

export const Company: VFC = () => {
  return (
    <div className={styles.content}>
      <About />

      <Logo />

      <Contacts />

      <Location />

      <SocialLinks />

      <CompanyActions />
    </div>
  );
};
