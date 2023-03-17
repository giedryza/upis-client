import { useRef } from 'react';
import { useMenuItem } from 'react-aria';
import { clsx } from 'clsx';

// import { Icon } from 'ui/icon';

import { Props } from './menu-item.types';
import styles from './menu-item.module.scss';

export const MenuItem = <T extends object>({ item, state }: Props<T>) => {
  const ref = useRef<HTMLLIElement>(null);
  const { menuItemProps, isFocused, isDisabled } = useMenuItem(
    { key: item.key },
    state,
    ref
  );

  return (
    <li
      {...menuItemProps}
      ref={ref}
      className={clsx(
        styles.item,
        isFocused && styles['-focus'],
        isDisabled && styles['-disabled']
      )}
    >
      {/* {icon ? <Icon name={icon} className={styles.icon} /> : null} */}
      <span className={styles.label}>{item.rendered}</span>
    </li>
  );
};
