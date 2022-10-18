import { FC } from 'react';

import { ImagePlaceholder } from 'ui';

import { Props } from './image-item.types';
import styles from './image-item.module.scss';

export const ImageItem: FC<Props> = ({ src }) => {
  return (
    <div className={styles.content}>
      {src ? (
        <img src={src} className={styles.image} alt="logo" />
      ) : (
        <ImagePlaceholder width={375} />
      )}
    </div>
  );
};
