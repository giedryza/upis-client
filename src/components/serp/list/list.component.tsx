import { FC } from 'react';
import { useWindowVirtualizer } from '@tanstack/react-virtual';
import { useSession } from 'next-auth/react';
import useTranslation from 'next-translate/useTranslation';

import { APP } from 'config';
import { InView, Loader } from 'ui';
import { SerpCard } from 'components/serp';
import { Footer } from 'components/layout';
import { useInfiniteTours, useToursFilters } from 'domain/tours';
import { useBreakpoints } from 'tools/hooks';
import { useAppDispatch } from 'tools/services';
import { serp } from 'domain/serp';

import { ListEmpty } from './atoms';
import styles from './list.module.scss';

export const SerpList: FC = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { xs } = useBreakpoints();

  const { data: session } = useSession();
  const filters = useToursFilters();
  const { data, isLoading, hasNextPage, fetchNextPage } =
    useInfiniteTours(filters);

  const tours = data ? data.pages.flat() : [];
  const heightRatio = xs ? 2.25 : 1;

  const virtualizer = useWindowVirtualizer({
    count: isLoading
      ? APP.serp.list.placeholdersCount
      : hasNextPage
      ? tours.length + 1
      : tours.length,
    estimateSize: () =>
      heightRatio * APP.serp.card.image.height + APP.serp.gridGap,
    overscan: 3,
    paddingStart: APP.serp.gridGap,
    getItemKey: (index) => tours[index]?._id ?? index,
  });

  const onEndReached = (isEndReached: boolean) => {
    if (isEndReached && hasNextPage) fetchNextPage();
  };

  const onHoverStart = (id: string) => {
    dispatch(serp.actions.setActive(id));
  };

  const onHoverEnd = () => {
    dispatch(serp.actions.setActive(''));
  };

  return (
    <section
      className={styles.container}
      style={{ '--spacing': APP.serp.gridGap }}
    >
      <h1 className="visually-hidden">{t('serp:list.title')}</h1>
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
                  paddingBottom: APP.serp.gridGap,
                }}
              >
                {isLoading ? (
                  <Loader height={heightRatio * APP.serp.card.image.height} />
                ) : isLast ? (
                  <InView
                    onInView={onEndReached}
                    placeholder={
                      <Loader
                        height={heightRatio * APP.serp.card.image.height}
                      />
                    }
                    focusable
                  />
                ) : tour ? (
                  <div
                    className={styles.card}
                    onMouseEnter={() => onHoverStart(tour._id)}
                    onTouchStart={() => onHoverStart(tour._id)}
                    onMouseLeave={onHoverEnd}
                    onTouchEnd={onHoverEnd}
                  >
                    <SerpCard tour={tour} userId={session?.user.id} />
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
      </div>

      {!tours.length && !isLoading ? <ListEmpty /> : null}

      <Footer />
    </section>
  );
};
