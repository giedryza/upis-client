import { FC, PropsWithChildren } from 'react';
import { clsx } from 'clsx';

import { Button } from 'ui';

import { Props } from './modal-content.types';
import styles from './modal-content.module.scss';

export const ModalContent: FC<PropsWithChildren<Props>> = ({
  children,
  title,
  actions = [],
}) => {
  return (
    <div className={styles.content}>
      <h2 className={styles.title}>{title}</h2>

      <div className={clsx(styles.body, 'scrollbar-hidden')}>{children}</div>

      {!!actions.length && (
        <div className={styles.footer}>
          {actions.map((action, i) => (
            <Button {...action} size="md" key={i} />
          ))}
        </div>
      )}
    </div>
  );
};
