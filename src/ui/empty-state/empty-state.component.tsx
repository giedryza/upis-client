import { FC } from 'react';
import Balancer from 'react-wrap-balancer';
import { clsx } from 'clsx';

import { Icon, Button, ButtonProps } from 'ui';

import { Props } from './empty-state.types';
import styles from './empty-state.module.scss';

const BUTTON_SIZE_BY_SIZE: Record<
  NonNullable<Props['size']>,
  ButtonProps['size']
> = {
  sm: 'xs',
  md: 'sm',
};

export const EmptyState: FC<Props> = ({
  title,
  message,
  icon,
  heading: Heading = 'h2',
  action,
  size = 'md',
}) => {
  return (
    <div className={clsx(styles.container, styles[`-size-${size}`])}>
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
        <Button
          {...action}
          variant="primary"
          width="normal"
          size={BUTTON_SIZE_BY_SIZE[size]}
        />
      )}
    </div>
  );
};
