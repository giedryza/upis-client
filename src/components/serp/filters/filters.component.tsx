import { FC } from 'react';
import useTranslation from 'next-translate/useTranslation';

import { APP } from 'config/app';
import { Pill } from 'ui';

import { FilterRegions } from './atoms';
import styles from './filters.module.scss';

export const SerpFilters: FC = () => {
  const { t } = useTranslation();

  return (
    <nav
      className={styles.nav}
      style={{ '--spacing': APP.serp.gridGap }}
      aria-label={t('serp:filters.title')}
    >
      <ul className={styles.list}>
        <li>
          <Pill label="Amenities" title="Amenities" popover={<div />} />
        </li>
        <li>
          <FilterRegions />
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
