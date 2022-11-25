import { FC } from 'react';
import { clsx } from 'clsx';

import { Button, Image } from 'ui';

import { Props } from './image-tile.types';
import styles from './image-tile.module.scss';

export const ImageTile: FC<Props> = ({
  image,
  alt,
  sizes,
  objectFit = 'cover',
  actions = [],
  tags = [],
}) => {
  return (
    <div className={styles.imageBox}>
      <Image
        className={styles.image}
        sizes={sizes}
        src={image}
        alt={alt}
        style={{ objectFit }}
      />

      {!!actions.length && (
        <ul className={styles.actions}>
          {actions.map((action, i) => (
            <li key={i}>
              <Button {...action} variant="tertiary" size="xs" />
            </li>
          ))}
        </ul>
      )}

      {!!tags.length && (
        <ul className={styles.tags}>
          {tags.map((tag, i) => (
            <li
              className={clsx(styles.tag, styles[`status-${tag.status}`])}
              key={i}
            >
              {tag.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
