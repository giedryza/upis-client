import { VFC } from 'react';

import { Icon } from 'ui/icon';

import { Props } from './image-placeholder.types';
import styles from './image-placeholder.module.scss';

export const ImagePlaceholder: VFC<Props> = () => {
  return (
    <div className={styles.container}>
      <Icon name="picture" className={styles.icon} />
    </div>
  );
};
