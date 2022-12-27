import { FC } from 'react';

import { APP } from 'config/app';
import { Pill } from 'ui';

import styles from './filters.module.scss';

export const SerpFilters: FC = () => {
  return (
    <nav className={styles.nav} style={{ '--spacing': APP.serp.gridGap }}>
      <ul className={styles.list}>
        <li>
          <Pill label="Amenities" title="Amenities" popover={<div />} />
        </li>
        <li>
          <Pill label="Regions" title="Regions" popover={<div />} active />
        </li>
        <li>
          <Pill label="Rivers" title="Rivers" popover={<div />} />
        </li>
        <li>
          <Pill label="Price" title="Price" popover={<div />} />
        </li>
      </ul>
    </nav>
  );
};
