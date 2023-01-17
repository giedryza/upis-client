import { FC } from 'react';
import Balancer from 'react-wrap-balancer';

import { Icon, Button } from 'ui';

import { Props } from './empty-state.types';
import styles from './empty-state.module.scss';

export const EmptyState: FC<Props> = ({
  title,
  message,
  icon,
  heading: Heading = 'h2',
  action,
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.body}>
        {!!icon && <Icon name={icon} className={styles.icon} />}
        <Heading className={styles.title}>{title}</Heading>
        {!!message && (
          <p className={styles.message}>
            <Balancer>{message}</Balancer>
          </p>
        )}
      </div>

      {!!action && (
        <Button {...action} variant="primary" size="xs" width="normal" />
      )}
    </div>
  );
};
