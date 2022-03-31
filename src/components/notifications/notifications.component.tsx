import { VFC } from 'react';

import { useAppSelector } from 'tools/services/store';
import { Portal } from 'ui';
import { selectNotifications } from 'domain/notifications';

import { Notification } from './atoms';
import styles from './notifications.module.scss';

export const Notifications: VFC = () => {
  const notifications = useAppSelector(selectNotifications);

  return (
    <Portal id="notifications">
      {!!notifications.length && (
        <div className={styles.container}>
          {notifications.map((notification) => (
            <Notification
              id={notification.id}
              type={notification.type}
              message={notification.message}
              key={notification.id}
            />
          ))}
        </div>
      )}
    </Portal>
  );
};
