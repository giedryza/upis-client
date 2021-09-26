import { VFC } from 'react';

import styles from './list.module.scss';
import { Props, MenuItem } from './list.types';

import { Button } from 'ui/button/button.component';

const List: VFC<Props> = ({ id, items }) => {
  return items.length ? (
    <ul className={styles.list} role="menu" aria-labelledby={id}>
      {items.map((item) => (
        <li role="none" key={item.label}>
          <Button
            icon={item.icon}
            label={item.label}
            onClick={item.onClick}
            url={item.url}
            target={item.target}
            styleType="ghost"
            textAlign="left"
            size="sm"
            block
            role="menuitem"
          />
        </li>
      ))}
    </ul>
  ) : null;
};

export { List };
export type { MenuItem };
