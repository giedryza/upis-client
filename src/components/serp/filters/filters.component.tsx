import { FC } from 'react';
import { clsx } from 'clsx';
import useTranslation from 'next-translate/useTranslation';

import { APP } from 'config/app';

import {
  FilterAmenities,
  FilterDays,
  FilterDifficulty,
  FilterDistance,
  FilterDuration,
  FilterRegions,
  FilterRivers,
} from './atoms';
import styles from './filters.module.scss';

export const SerpFilters: FC = () => {
  const { t } = useTranslation();

  const items = [
    <FilterAmenities key="amenities" />,
    <FilterRegions key="regions" />,
    <FilterRivers key="rivers" />,
    <FilterDays key="days" />,
    <FilterDuration key="duration" />,
    <FilterDistance key="distance" />,
    <FilterDifficulty key="difficulty" />,
  ] as const;

  return (
    <nav
      className={styles.nav}
      style={{ '--spacing': APP.serp.gridGap }}
      aria-label={t('serp:filters.title')}
    >
      <div className={clsx(styles.swiper, 'scrollbar-hidden')}>
        <ul className={styles.list}>
          {items.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      </div>
    </nav>
  );
};
