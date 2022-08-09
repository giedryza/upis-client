import { VFC } from 'react';

import { Icon, Button } from 'ui';

import { Props } from './tile.types';
import styles from './tile.module.scss';

export const Tile: VFC<Props> = ({
  icon,
  title,
  subtitle,
  heading: Heading = 'h3',
  fields = [],
  actions = [],
}) => {
  return (
    <div className={styles.tile}>
      <Icon name={icon} className={styles.icon} />

      <div className={styles.body}>
        <div className={styles.header}>
          <Heading className={styles.title}>{title}</Heading>
          {!!subtitle && <div className={styles.subtitle}>{subtitle}</div>}
        </div>

        {!!fields.length && (
          <ul className={styles.fields}>
            {fields.map((field, i) => (
              <li className={styles.field} key={i}>
                <div className={styles.label}>{field.label}</div>
                <div className={styles.sublabel}>{field.sublabel}</div>
              </li>
            ))}
          </ul>
        )}

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
    </div>
  );
};
