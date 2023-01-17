import { FC } from 'react';
import { useWindowVirtualizer } from '@tanstack/react-virtual';
import useTranslation from 'next-translate/useTranslation';

import { APP } from 'config/app';
import { Container, EmptyState, InView, Loader } from 'ui';
import { SerpCard } from 'components/serp';
import { Footer } from 'components/layout';
import { useInfiniteTours, useToursActiveFilters } from 'domain/tours';

import styles from './list.module.scss';

export const SerpList: FC = () => {
  const { t } = useTranslation();

  const { data: filters } = useToursActiveFilters();
  const { data, isLoading, hasNextPage, fetchNextPage } =
    useInfiniteTours(filters);

  const tours = data ? data.pages.flat() : [];

  const virtualizer = useWindowVirtualizer({
    count: isLoading ? 5 : hasNextPage ? tours.length + 1 : tours.length,
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
                {isLoading ? (
                  <Loader height={APP.serp.cardHeight} />
                ) : isLast ? (
                  <InView
                    onInView={onEndReached}
                    placeholder={<Loader height={APP.serp.cardHeight} />}
                  />
                ) : tour ? (
                  <SerpCard tour={tour} />
                ) : null}
              </div>
            );
          })}
        </div>
      </div>

      {!tours.length && !isLoading ? (
        <div className={styles.empty}>
          <Container size="xs">
            <EmptyState
              title={t('serp:list.empty.title')}
              message={t('serp:list.empty.description')}
              action={{ label: t('serp:list.empty.clear') }}
              icon="path"
            />
          </Container>
        </div>
      ) : null}

      <Footer />
    </div>
  );
};
