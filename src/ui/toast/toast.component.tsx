import { VFC } from 'react';
import { clsx } from 'clsx';

import { Icon, Button } from 'ui';

import { Props } from './toast.types';
import styles from './toast.module.scss';

export const Toast: VFC<Props> = ({
  type = 'info',
  message,
  onClose,
  onMouseEnter,
  onMouseLeave,
  onTouchStart,
  onTouchEnd,
}) => {
  return (
    <div
      className={styles.toast}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <Icon name="bell" className={clsx(styles.icon, styles[`type-${type}`])} />
      <p className={styles.message}>{message}</p>
      {!!onClose && (
        <div className={styles.actions}>
          <Button
            icon="close"
            variant="ghost"
            size="sm"
            attributes={{
              onClick: onClose,
            }}
          />
        </div>
      )}
    </div>
  );
};
