import { useState, VFC } from 'react';
import clsx from 'clsx';

import { useAppDispatch } from 'tools/services/store';
import { useTimeout } from 'tools/hooks';
import { Toast } from 'ui';
import { notifications } from 'domain/notifications';

import { Props } from './notification.types';
import { NOTIFICATION_FADE_DELAY } from './notification.constants';
import styles from './notification.module.scss';

export const Notification: VFC<Props> = ({ id, type, message }) => {
  const dispatch = useAppDispatch();

  const [isFading, setIsFading] = useState(true);

  useTimeout(
    () => dispatch(notifications.actions.close(id)),
    isFading ? NOTIFICATION_FADE_DELAY - 10 : null
  );

  return (
    <div
      className={clsx({ [styles.fading as string]: isFading })}
      style={{
        '--fade-delay': NOTIFICATION_FADE_DELAY,
      }}
    >
      <Toast
        type={type}
        message={message}
        onMouseEnter={() => setIsFading(false)}
        onMouseLeave={() => setIsFading(true)}
        onTouchStart={() => setIsFading(false)}
        onTouchEnd={() => setIsFading(true)}
        onClose={() => {
          setIsFading(false);
          dispatch(notifications.actions.close(id));
        }}
      />
    </div>
  );
};
