import { VFC } from 'react';

import { useAppSelector } from 'tools/services/store';
import { Portal } from 'ui';
import { selectAlerts } from 'domain/alerts';

import { Alert } from './atoms';
import styles from './alerts.module.scss';

export const Alerts: VFC = () => {
  const alerts = useAppSelector(selectAlerts);

  return (
    <Portal id="alerts">
      {!!alerts.length && (
        <ul className={styles.container}>
          {alerts.map((alert) => (
            <li key={alert.id}>
              <Alert id={alert.id} type={alert.type} message={alert.message} />
            </li>
          ))}
        </ul>
      )}
    </Portal>
  );
};
