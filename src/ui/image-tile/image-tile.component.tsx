import { VFC } from 'react';
import { clsx } from 'clsx';

import { Button } from 'ui/button';

import { Props } from './image-tile.types';
import styles from './image-tile.module.scss';

export const ImageTile: VFC<Props> = ({
  image,
  alt,
  actions = [],
  tags = [],
}) => {
  return (
    <div className={styles.imageBox}>
      <img className={styles.image} src={image} alt={alt} />

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
