import { FC } from 'react';
import { clsx } from 'clsx';
import Image from 'next/image';

import { Button } from 'ui/button';

import { Props } from './image-tile.types';
import styles from './image-tile.module.scss';

export const ImageTile: FC<Props> = ({
  image,
  alt,
  objectFit = 'cover',
  actions = [],
  tags = [],
}) => {
  return (
    <div className={styles.imageBox}>
      <Image
        className={styles.image}
        fill
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
