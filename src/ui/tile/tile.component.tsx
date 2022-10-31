import { VFC } from 'react';
import Link from 'next/link';

import { Icon, Button } from 'ui';

import { Props } from './tile.types';
import styles from './tile.module.scss';

export const Tile: VFC<Props> = ({
  icon,
  title,
  subtitle,
  url,
  heading: Heading = 'h3',
  fields = [],
  actions = [],
}) => {
  return (
    <div className={styles.tile}>
      {!!icon && (
        <div className={styles.icon}>
          <Icon name={icon} />
        </div>
      )}

      <div className={styles.body}>
        <div className={styles.header}>
          <Heading className={styles.title}>
            {url ? (
              <Link href={url} legacyBehavior={false}>
                {title}
              </Link>
            ) : (
              title
            )}
          </Heading>
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
