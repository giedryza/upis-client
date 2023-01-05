import { FC } from 'react';
import useTranslation from 'next-translate/useTranslation';

import { APP } from 'config/app';

import {
  FilterAmenities,
  FilterDistance,
  FilterRegions,
  FilterRivers,
} from './atoms';
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
          <FilterAmenities />
        </li>
        <li>
          <FilterRegions />
        </li>
        <li>
          <FilterRivers />
        </li>
        <li>
          <FilterDistance />
        </li>
      </ul>
    </nav>
  );
};
