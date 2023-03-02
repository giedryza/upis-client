import { FC, ReactNode } from 'react';

import { useAppSelector } from 'tools/services';
import { selectSerpState, SerpView } from 'domain/serp';
import { useBreakpoints } from 'tools/hooks';
import { SerpFilters, SerpList, SerpMap } from 'components/serp';

import styles from './results.module.scss';

export const SerpResults: FC = () => {
  const { md } = useBreakpoints();
  const { view } = useAppSelector(selectSerpState);

  const RESULTS_BY_VIEW: Record<SerpView, ReactNode> = {
    list: <SerpList />,
    map: <SerpMap />,
  };

  return (
    <div>
      <SerpFilters />

      <main className={styles.main}>
        {md ? (
          RESULTS_BY_VIEW[view]
        ) : (
          <>
            <SerpList />
            <SerpMap />
          </>
        )}
      </main>
    </div>
  );
};
