import { VFC } from 'react';
import clsx from 'clsx';

import { Icon, Button } from 'ui';

import { Props } from './notification.types';
import styles from './notification.module.scss';

export const Notification: VFC<Props> = ({
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
      className={styles.notification}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <Icon name="bell" className={clsx(styles.icon, styles[`type-${type}`])} />
      <p className={styles.message}>{message}</p>
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
    </div>
  );
};
