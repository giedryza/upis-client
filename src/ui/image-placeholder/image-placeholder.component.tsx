import { FC } from 'react';

import { Icon } from 'ui/icon';

import { Props } from './image-placeholder.types';
import styles from './image-placeholder.module.scss';

export const ImagePlaceholder: FC<Props> = ({ fit = 'fixed' }) => {
  return (
    <div
      className={styles.container}
      style={fit === 'fluid' ? { width: '100%', height: '100%' } : {}}
    >
      <Icon name="picture" className={styles.icon} />
    </div>
  );
};
