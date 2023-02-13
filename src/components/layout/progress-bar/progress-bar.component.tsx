import { FC, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { clsx } from 'clsx';

import { useInterval, useIsNavigating } from 'tools/hooks';
import { Portal, Progress } from 'ui';

import {
  INTERVAL,
  RESERVED_AMOUNT,
  STEP,
  TOTAL_PROGRESS,
} from './progress-bar.constants';
import { slowingGrowth } from './progress-bar.utils';
import styles from './progress-bar.module.scss';

export const ProgressBar: FC = () => {
  const { events } = useRouter();

  const [time, setTime] = useState(1);

  const reset = () => {
    setTime(1);
  };

  useEffect(() => {
    events.on('routeChangeComplete', reset);
    events.on('routeChangeError', reset);
  }, [events]);

  const { isNavigating } = useIsNavigating();
  useInterval(
    () => {
      setTime((prev) => prev + 1);
    },
    isNavigating && time < TOTAL_PROGRESS ? INTERVAL : null
  );

  return (
    <Portal id="progress-bar">
      <div className={clsx(styles.progressBar, !isNavigating && styles.hidden)}>
        <Progress
          value={
            isNavigating
              ? Math.floor(
                  slowingGrowth(
                    STEP / 100,
                    TOTAL_PROGRESS - RESERVED_AMOUNT,
                    time
                  )
                )
              : 100
          }
          ariaLabel="progress"
        />
      </div>
    </Portal>
  );
};
