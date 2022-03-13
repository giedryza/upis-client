import { VFC } from 'react';

import { About } from './about';
import { Contacts } from './contacts';
import { Location } from './location';
import { SocialLinks } from './social-links';
import styles from './company-preview.module.scss';

export const CompanyPreview: VFC = () => {
  return (
    <div className={styles.content}>
      <About />

      <Contacts />

      <Location />

      <SocialLinks />
    </div>
  );
};
