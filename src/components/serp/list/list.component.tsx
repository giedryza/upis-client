import { FC } from 'react';
import { useWindowVirtualizer } from '@tanstack/react-virtual';

import { APP } from 'config/app';
import { SerpCard } from 'components/serp';
import { Footer } from 'components/layout';
import { useInfiniteTours } from 'domain/tours';

import styles from './list.module.scss';

export const SerpList: FC = () => {
  const { data } = useInfiniteTours();

  const tours = data ? data.pages.flat() : [];

  const virtualizer = useWindowVirtualizer({
    count: tours.length,
    estimateSize: () => APP.serp.cardHeight + APP.serp.gridGap,
    overscan: 3,
    paddingStart: APP.serp.gridGap,
    getItemKey: (index) => tours[index]?._id ?? index,
  });

  return (
    <div className={styles.container} style={{ '--spacing': APP.serp.gridGap }}>
      <div className={styles.list}>
        <div
          style={{
            height: virtualizer.getTotalSize(),
            width: '100%',
            position: 'relative',
          }}
        >
          {virtualizer.getVirtualItems().map((row) => {
            const tour = tours[row.index];

            return (
              <div
                key={row.key}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: row.size,
                  transform: `translateY(${row.start}px)`,
                }}
              >
                {tour ? <SerpCard tour={tour} /> : null}
              </div>
            );
          })}
        </div>
      </div>

      <Footer />
    </div>
  );
};
