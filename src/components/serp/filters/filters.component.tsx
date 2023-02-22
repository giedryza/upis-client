import { FC, useRef } from 'react';
import { clsx } from 'clsx';
import useTranslation from 'next-translate/useTranslation';

import { APP } from 'config';
import { useBreakpoints, useOverflowDimensions } from 'tools/hooks';
import { Button } from 'ui';

import {
  FilterAmenities,
  FilterDays,
  FilterDifficulty,
  FilterDistance,
  FilterDuration,
  FilterProviders,
  FilterRegions,
  FilterRivers,
  FiltersClear,
  FiltersModalTrigger,
  ViewToggle,
} from './atoms';
import styles from './filters.module.scss';

export const SerpFilters: FC = () => {
  const { t } = useTranslation();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const { xs, md } = useBreakpoints();
  const { containerWidth, totalWidth, offsetLeft, offsetRight } =
    useOverflowDimensions(scrollContainerRef);

  const items = [
    ...(md ? [<ViewToggle key="view-toggle" />] : []),
    ...(xs
      ? [<FiltersModalTrigger key="modal-trigger" />]
      : [
          <FilterAmenities key="amenities" />,
          <FilterRegions key="regions" />,
          <FilterRivers key="rivers" />,
          <FilterDays key="days" />,
          <FilterDuration key="duration" />,
          <FilterDistance key="distance" />,
          <FilterDifficulty key="difficulty" />,
          <FilterProviders key="providers" />,
        ]),
    <FiltersClear key="clear" />,
  ] as const;

  const handleScroll = (direction: 'left' | 'right') => {
    scrollContainerRef.current?.scrollBy({
      left: containerWidth * 0.5 * (direction === 'left' ? -1 : 1),
      behavior: 'smooth',
    });
  };

  return (
    <div className={styles.container} style={{ '--spacing': APP.serp.gridGap }}>
      <nav className={styles.nav} aria-label={t('serp:filters.title')}>
        <div
          className={clsx(styles.swiper, 'scrollbar-hidden')}
          ref={scrollContainerRef}
        >
          <ul className={styles.list}>
            {items.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>

        {containerWidth < totalWidth ? (
          <>
            {offsetLeft ? (
              <div className={clsx(styles.controls, styles['-left'])}>
                <Button
                  as="button"
                  icon="chevron-left"
                  size="xs"
                  variant="secondary"
                  onClick={() => handleScroll('left')}
                  aria-label={t('common:actions.forward')}
                />
              </div>
            ) : null}
            {offsetRight ? (
              <div className={clsx(styles.controls, styles['-right'])}>
                <Button
                  as="button"
                  icon="chevron-right"
                  size="xs"
                  variant="secondary"
                  onClick={() => handleScroll('right')}
                  aria-label={t('common:actions.back')}
                />
              </div>
            ) : null}
          </>
        ) : null}
      </nav>
    </div>
  );
};
