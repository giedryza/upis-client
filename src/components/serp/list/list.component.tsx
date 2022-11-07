import { FC } from 'react';

import { SerpCard } from 'components/serp';
import { Footer } from 'components/footer/footer.component';

import styles from './list.module.scss';

export const SerpList: FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.list}>
        {Array.from({ length: 15 }).map((_, i) => (
          <SerpCard id={String(i)} key={i} />
        ))}
      </div>

      <Footer />
    </div>
  );
};
