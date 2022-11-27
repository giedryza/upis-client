import { FC } from 'react';

import { Icon } from 'ui/icon';

import { Props } from './image-placeholder.types';
import styles from './image-placeholder.module.scss';

export const ImagePlaceholder: FC<Props> = ({ width }) => {
  return (
    <div className={styles.container} style={{ maxWidth: width }}>
      <Icon name="picture" className={styles.icon} />
    </div>
  );
};
