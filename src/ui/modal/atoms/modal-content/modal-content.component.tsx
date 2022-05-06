import React, { FC } from 'react';

import { Button } from 'ui';

import { Props } from './modal-content.types';
import styles from './modal-content.module.scss';

export const ModalContent: FC<Props> = ({ children, title, actions = [] }) => {
  return (
    <div className={styles.content}>
      <h2 className={styles.title}>{title}</h2>

      <div>{children}</div>

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
