import { VFC } from 'react';

import { Props } from './image-item.types';
import styles from './image-item.module.scss';

export const ImageItem: VFC<Props> = ({ src }) => {
  return (
    <div className={styles.content}>
      <img
        src={src || '/images/placeholder.png'}
        className={styles.image}
        alt="logo"
      />
    </div>
  );
};
