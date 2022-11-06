import { FC } from 'react';

import { Props } from './card.types';
import styles from './card.module.scss';

export const SerpCard: FC<Props> = ({ id }) => {
  return (
    <div className={styles.card}>
      <img
        className={styles.image}
        src={`https://picsum.photos/400/300?random=${id}`}
        alt=""
      />
    </div>
  );
};
