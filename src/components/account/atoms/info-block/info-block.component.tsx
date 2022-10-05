import { FC } from 'react';
import { clsx } from 'clsx';

import { Button, Card, Icon } from 'ui';

import { Props } from './info-block.types';
import styles from './info-block.module.scss';

export const InfoBlock: FC<Props> = ({
  title,
  icon,
  columns = 2,
  children,
  actions = [],
}) => {
  return (
    <Card>
      <section
        className={styles.container}
        style={{ '--grid-columns': columns }}
      >
        <div className={styles.header}>
          <div className={styles.heading}>
            <Icon name={icon} className={styles.icon} />
            <h2 className={styles.title}>{title}</h2>
          </div>

          {!!actions.length && (
            <ul className={styles.actions}>
              {actions.map((action, i) => (
                <li key={i}>
                  <Button {...action} size="xs" />
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className={clsx(styles.content, columns === 1 && styles.single)}>
          {children}
        </div>
      </section>
    </Card>
  );
};
