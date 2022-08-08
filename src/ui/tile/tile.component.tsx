import { VFC } from 'react';

import { Icon, Button } from 'ui';

import { Props } from './tile.types';
import styles from './tile.module.scss';

export const Tile: VFC<Props> = ({
  icon,
  title,
  subtitle,
  fields = [],
  actions = [],
}) => {
  return (
    <div className={styles.tile}>
      <Icon name={icon} className={styles.icon} />

      <div className={styles.body}>
        <div className={styles.header}>
          <div className={styles.title}>{title}</div>
          {!!subtitle && <div className={styles.subtitle}>{subtitle}</div>}
        </div>

        {!!fields.length && (
          <div className={styles.fields}>
            {fields.map((field, i) => (
              <div className={styles.field} key={i}>
                <div className={styles.label}>{field.label}</div>
                <div className={styles.sublabel}>{field.sublabel}</div>
              </div>
            ))}
          </div>
        )}

        {!!actions.length && (
          <div className={styles.actions}>
            {actions.map((action, i) => (
              <Button {...action} size="xs" key={i} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
