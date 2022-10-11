import { VFC } from 'react';
import { clsx } from 'clsx';

import { Button } from 'ui/button';

import { Props } from './image-box.types';
import styles from './image-box.module.scss';

export const ImageBox: VFC<Props> = ({
  image,
  alt,
  actions = [],
  label,
  status = 'info',
}) => {
  return (
    <div className={styles.imageBox}>
      <img className={styles.image} src={image} alt={alt} />

      {!!actions.length && (
        <div className={styles.actions}>
          {actions.map((action, i) => (
            <Button {...action} variant="tertiary" size="xs" key={i} />
          ))}
        </div>
      )}

      {!!label && (
        <div className={clsx(styles.label, styles[`status-${status}`])}>
          {label}
        </div>
      )}
    </div>
  );
};