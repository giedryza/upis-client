import { VFC } from 'react';

import { Button, ButtonProps } from 'ui/button';

import styles from './list.module.scss';
import { Props } from './list.types';

export const List: VFC<Props> = ({ id, items }) => {
  return items.length ? (
    <ul className={styles.list} role="menu" aria-labelledby={id}>
      {items.map((item) => {
        const buttonProps: ButtonProps = {
          icon: item.icon,
          label: item.label,
          variant: 'ghost',
          textAlign: 'left',
          size: 'sm',
          block: true,
        };

        return (
          <li role="none" key={item.label}>
            {item.url ? (
              <Button
                {...buttonProps}
                url={item.url}
                attributes={{
                  role: 'menuitem',
                  onClick: item.onClick,
                }}
              />
            ) : (
              <Button
                {...buttonProps}
                attributes={{
                  role: 'menuitem',
                  onClick: item.onClick,
                }}
              />
            )}
          </li>
        );
      })}
    </ul>
  ) : null;
};

export * from './list.types';
