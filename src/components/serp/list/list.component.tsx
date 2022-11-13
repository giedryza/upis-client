import { FC } from 'react';
import { useWindowVirtualizer } from '@tanstack/react-virtual';

import { SerpCard } from 'components/serp';
import { Footer } from 'components/layout';

import styles from './list.module.scss';

const COUNT = 40;
const GAP = 15;

export const SerpList: FC = () => {
  const virtualizer = useWindowVirtualizer({
    count: COUNT,
    estimateSize: () => 200 + GAP,
    overscan: 3,
    paddingStart: GAP,
    // getItemKey
  });

  return (
    <div className={styles.container} style={{ '--spacing': GAP }}>
      <div className={styles.list}>
        <div
          style={{
            height: virtualizer.getTotalSize(),
            width: '100%',
            position: 'relative',
          }}
        >
          {virtualizer.getVirtualItems().map((row) => (
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
              <SerpCard id={String(row.key)} />
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
};
