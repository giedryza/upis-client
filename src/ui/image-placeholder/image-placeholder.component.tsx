import { FC } from 'react';
import { clsx } from 'clsx';

import { Icon } from 'ui/icon';

import { Props } from './image-placeholder.types';
import styles from './image-placeholder.module.scss';

export const ImagePlaceholder: FC<Props> = ({
  fit = 'fixed',
  radius = 'none',
}) => {
  return (
    <div
      className={clsx(styles.container, styles[`-radius-${radius}`])}
      style={fit === 'fluid' ? { width: '100%', height: '100%' } : {}}
    >
      <Icon name="picture" className={styles.icon} />
    </div>
  );
};
