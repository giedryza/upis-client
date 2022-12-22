import { FC } from 'react';
import { useWindowVirtualizer } from '@tanstack/react-virtual';

import { APP } from 'config/app';
import { SerpCard } from 'components/serp';
import { Footer } from 'components/layout';
import { useInfiniteTours } from 'domain/tours';

import { EndRow } from './atoms';
import styles from './list.module.scss';

export const SerpList: FC = () => {
  const { data, hasNextPage, fetchNextPage } = useInfiniteTours({ limit: 15 });

  const tours = data ? data.pages.flat() : [];

  const virtualizer = useWindowVirtualizer({
    count: hasNextPage ? tours.length + 1 : tours.length,
    estimateSize: () => APP.serp.cardHeight + APP.serp.gridGap,
    overscan: 3,
    paddingStart: APP.serp.gridGap,
    getItemKey: (index) => tours[index]?._id ?? index,
  });

  const onEndReached = () => {
    if (hasNextPage) fetchNextPage();
  };

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
            const isLast = row.index > tours.length - 1;
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
                {isLast ? (
                  <EndRow onInView={onEndReached} />
                ) : tour ? (
                  <SerpCard tour={tour} />
                ) : null}
              </div>
            );
          })}
        </div>
      </div>

      <Footer />
    </div>
  );
};
